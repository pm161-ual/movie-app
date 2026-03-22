import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie, OMDbMovieDetailResponse, OMDbSearchResponse } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class NewserviceService {

  private readonly favoritesStorageKey = 'servApp:favorites';

  private http = inject(HttpClient);

  private _searchTerm = signal('');
  searchTerm = this._searchTerm.asReadonly();

  private _movies = signal<Movie[]>([]);
  movies = this._movies.asReadonly();

  totalResults = computed(() => this._movies().length);

  private _isSearching = signal(false);
  isSearching = this._isSearching.asReadonly();

  private _searchError = signal<string | null>(null);
  searchError = this._searchError.asReadonly();

  private _currentMovie = signal<Movie | null>(null);
  currentMovie = this._currentMovie.asReadonly();

  private _isLoadingDetails = signal(false);
  isLoadingDetails = this._isLoadingDetails.asReadonly();

  private _detailsError = signal<string | null>(null);
  detailsError = this._detailsError.asReadonly();

  private _favorites = signal<Movie[]>([]);
  favorites = this._favorites.asReadonly();

  favoritesCount = computed(() => this._favorites().length);

  constructor() {
    this.loadFavorites();
  }

  isFavorite(movieId: string): boolean {
    return this._favorites().some((movie) => movie.imdbID === movieId);
  }

  searchMovies(title: string) {
    const normalizedTitle = title.trim();
    this._searchTerm.set(normalizedTitle);
    this._searchError.set(null);

    if (normalizedTitle.length < 3) {
      this._movies.set([]);
      this._isSearching.set(false);
      return;
    }

    this._isSearching.set(true);

    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(normalizedTitle)}&apikey=${environment.apiKeyOMDb}`;
    this.http.get<OMDbSearchResponse>(url)
      .pipe(finalize(() => this._isSearching.set(false)))
      .subscribe({
        next: (data) => {
          if (data.Response === 'False') {
            this._movies.set([]);
            this._searchError.set(data.Error || 'No se pudieron obtener resultados.');
            return;
          }

          this._movies.set(data.Search ?? []);
        },
        error: () => {
          this._movies.set([]);
          this._searchError.set('Error de conexión al buscar películas.');
        }
      });
  }

  getMovieDetails(id: string) {
    this._detailsError.set(null);
    this._isLoadingDetails.set(true);

    const url = `https://www.omdbapi.com/?i=${id}&apikey=${environment.apiKeyOMDb}`;
    this.http.get<OMDbMovieDetailResponse>(url)
      .pipe(finalize(() => this._isLoadingDetails.set(false)))
      .subscribe({
        next: (data) => {
          if (data.Response === 'False') {
            this._currentMovie.set(null);
            this._detailsError.set(data.Error || 'No se encontró la película.');
            return;
          }

          this._currentMovie.set(data);
        },
        error: () => {
          this._currentMovie.set(null);
          this._detailsError.set('Error de conexión al cargar el detalle.');
        }
      });
  }

  toggleFavorite(movie: Movie) {
    const current = this._favorites();
    const exists = current.find((currentMovie) => currentMovie.imdbID === movie.imdbID);

    if (exists) {
      this._favorites.set(current.filter((currentMovie) => currentMovie.imdbID !== movie.imdbID));
    } else {
      this._favorites.set([...current, movie]);
    }

    this.saveFavorites();
  }

  private loadFavorites() {
    const storedFavorites = localStorage.getItem(this.favoritesStorageKey);

    if (!storedFavorites) {
      return;
    }

    try {
      const parsedFavorites = JSON.parse(storedFavorites) as Movie[];
      this._favorites.set(Array.isArray(parsedFavorites) ? parsedFavorites : []);
    } catch {
      this._favorites.set([]);
    }
  }

  private saveFavorites() {
    localStorage.setItem(this.favoritesStorageKey, JSON.stringify(this._favorites()));
  }
}