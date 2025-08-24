import type { IMovieApiService } from './movie-api/movie-api.types';
import type { IPeopleApiService } from './people-api/people-api.types';

export interface IApiProvider {
  people: IPeopleApiService;
  movie: IMovieApiService;
}
