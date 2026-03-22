import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonList, IonItem, IonThumbnail, IonLabel, IonBadge, IonText,
} from '@ionic/angular/standalone';
import { NewserviceService } from '../core/services/newservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonList, IonItem, IonThumbnail, IonLabel, IonBadge, IonText,
  ],
})
export class HomePage {
  readonly placeholderPoster = 'assets/icon/movie-placeholder.svg';
  showOnlyFavorites = false;

  private movieService = inject(NewserviceService);
  private router = inject(Router);

  movies = this.movieService.movies;
  totalResults = this.movieService.totalResults;
  isSearching = this.movieService.isSearching;
  searchError = this.movieService.searchError;
  favorites = this.movieService.favorites;
  favoritesCount = this.movieService.favoritesCount;
  searchTerm = this.movieService.searchTerm;

  onSearch(event: Event) {
    const input = event.target as HTMLIonSearchbarElement;
    this.movieService.searchMovies(input.value?.toString() ?? '');
  }

  openMovieDetail(movieId: string) {
    this.movieService.getMovieDetails(movieId);
    this.router.navigate(['/movie', movieId]);
  }

  isFavorite(movieId: string): boolean {
    return this.movieService.isFavorite(movieId);
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

  toggleFavoritesView() {
    this.showOnlyFavorites = !this.showOnlyFavorites;
  }

}