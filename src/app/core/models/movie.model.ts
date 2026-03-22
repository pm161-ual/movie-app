export interface Movie {
Title: string;
Year: string;
imdbID: string;
Type: string;
Poster: string;
Plot?: string;
Genre?: string;
Director?: string;
Actors?: string;
Runtime?: string;
imdbRating?: string;
}

export interface OMDbSuccessResponse {
Response: 'True';
}

export interface OMDbErrorResponse {
Response: 'False';
Error: string;
}

export type OMDbSearchResponse =
	| ({ Search: Movie[]; totalResults: string } & OMDbSuccessResponse)
	| OMDbErrorResponse;

export type OMDbMovieDetailResponse = (Movie & OMDbSuccessResponse) | OMDbErrorResponse;
