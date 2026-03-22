import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonButton, IonBadge, IonCard, IonCardContent, IonText,
} from '@ionic/angular/standalone';
import { NewserviceService } from '../core/services/newservice.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
  standalone: true,
  imports: [ IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonButton, IonBadge, IonCard, IonCardContent, IonText,
  ],
})
export class MovieDetailPage {
  readonly placeholderPoster = 'assets/icon/movie-placeholder.svg';
  private readonly defaultBackground = 'linear-gradient(120deg, #07133d 0%, #24104b 45%, #03506d 100%)';
  private backgroundUpdateId = 0;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private movieService = inject(NewserviceService);

  private _detailBackground = signal(this.defaultBackground);
  detailBackground = this._detailBackground.asReadonly();

  currentMovie = this.movieService.currentMovie;
  favoritesCount = this.movieService.favoritesCount;
  isLoadingDetails = this.movieService.isLoadingDetails;
  detailsError = this.movieService.detailsError;
  movies = this.movieService.movies;
  favorites = this.movieService.favorites;

  recommendationTitle = computed(() =>
    this.isCurrentMovieFavorite() ? 'Favoritos' : 'Recomendaciones'
  );

  recommendedMovies = computed(() => {
    const current = this.currentMovie();
    if (!current) {
      return [];
    }

    if (this.movieService.isFavorite(current.imdbID)) {
      return this.favorites()
        .filter((movie) => movie.imdbID !== current.imdbID)
        .slice(0, 8);
    }

    const nonFavoriteResults = this.movies()
      .filter((movie) => movie.imdbID !== current.imdbID)
      .filter((movie) => !this.movieService.isFavorite(movie.imdbID));

    return nonFavoriteResults.slice(0, 8);
  });

  isCurrentMovieFavorite = computed(() => {
    const movie = this.currentMovie();
    if (!movie) {
      return false;
    }
    return this.movieService.isFavorite(movie.imdbID);
  });

  constructor() {
    const movieId = this.route.snapshot.paramMap.get('id');
    const selectedMovie = this.currentMovie();

    if (movieId && selectedMovie?.imdbID !== movieId) {
      this.movieService.getMovieDetails(movieId);
    }

    effect(() => {
      const movie = this.currentMovie();

      if (!movie) {
        this._detailBackground.set(this.defaultBackground);
        return;
      }

      this.setDynamicBackgroundFromPoster(this.getPosterUrl(movie.Poster));
    });
  }

  toggleCurrentMovieFavorite() {
    const movie = this.currentMovie();
    if (!movie) {
      return;
    }

    this.movieService.toggleFavorite(movie);
  }

  getPosterUrl(poster?: string): string {
    if (!poster || poster === 'N/A') {
      return this.placeholderPoster;
    }

    return poster.replace('http://', 'https://');
  }

  onImageError(event: Event) {
    const imageElement = event.target as HTMLImageElement;
    imageElement.src = this.placeholderPoster;
  }

  goToSearch(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  openRecommendation(movieId: string) {
    if (!movieId) {
      return;
    }

    this.movieService.getMovieDetails(movieId);
    this.router.navigate(['/movie', movieId]);
  }

  private async setDynamicBackgroundFromPoster(posterUrl: string) {
    const updateId = ++this.backgroundUpdateId;

    if (!posterUrl || posterUrl === this.placeholderPoster) {
      this._detailBackground.set(this.defaultBackground);
      return;
    }

    const dominantColor = await this.extractDominantColor(posterUrl);

    if (updateId !== this.backgroundUpdateId) {
      return;
    }

    if (!dominantColor) {
      this._detailBackground.set(this.defaultBackground);
      return;
    }

    const darkBase = this.darkenColor(dominantColor, 0.62);
    const darkMid = this.darkenColor(dominantColor, 0.48);
    const darkAccent = this.darkenColor(dominantColor, 0.34);

    this._detailBackground.set(
      `linear-gradient(120deg, rgb(${darkBase.r}, ${darkBase.g}, ${darkBase.b}) 0%, rgb(${darkMid.r}, ${darkMid.g}, ${darkMid.b}) 48%, rgb(${darkAccent.r}, ${darkAccent.g}, ${darkAccent.b}) 100%)`
    );
  }

  private extractDominantColor(imageUrl: string): Promise<{ r: number; g: number; b: number } | null> {
    return new Promise((resolve) => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.referrerPolicy = 'no-referrer';

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) {
          resolve(null);
          return;
        }

        const sampleWidth = 48;
        const sampleHeight = 48;
        canvas.width = sampleWidth;
        canvas.height = sampleHeight;

        context.drawImage(image, 0, 0, sampleWidth, sampleHeight);

        try {
          const pixelData = context.getImageData(0, 0, sampleWidth, sampleHeight).data;
          let rTotal = 0;
          let gTotal = 0;
          let bTotal = 0;
          let count = 0;

          for (let index = 0; index < pixelData.length; index += 4) {
            const r = pixelData[index];
            const g = pixelData[index + 1];
            const b = pixelData[index + 2];
            const alpha = pixelData[index + 3];
            const brightness = (r + g + b) / 3;

            if (alpha < 40 || brightness < 18) {
              continue;
            }

            rTotal += r;
            gTotal += g;
            bTotal += b;
            count += 1;
          }

          if (count === 0) {
            resolve(null);
            return;
          }

          resolve({
            r: Math.round(rTotal / count),
            g: Math.round(gTotal / count),
            b: Math.round(bTotal / count),
          });
        } catch {
          resolve(null);
        }
      };

      image.onerror = () => resolve(null);
      image.src = imageUrl;
    });
  }

  private darkenColor(
    color: { r: number; g: number; b: number },
    factor: number
  ): { r: number; g: number; b: number } {
    return {
      r: Math.max(0, Math.round(color.r * factor)),
      g: Math.max(0, Math.round(color.g * factor)),
      b: Math.max(0, Math.round(color.b * factor)),
    };
  }
}
