import axios from 'axios';
import type { IApiConfig } from '../index.types';
import type { IApiProvider } from './api-provider.types';
import type { ICacheService } from './cache-service/cache-service.types';
import { MovieApiService } from './movie-api/movie-api.service';
import type { IMovieApiService } from './movie-api/movie-api.types';
import { PeopleApiService } from './people-api/people-api.service';
import type { IPeopleApiService } from './people-api/people-api.types';

export class ApiProvider implements IApiProvider {
  readonly people: IPeopleApiService;
  readonly movie: IMovieApiService;

  constructor(config: IApiConfig, cache: ICacheService) {
    const client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout,
      headers: config.headers,
    });
    this.people = new PeopleApiService(client, cache);
    this.movie = new MovieApiService(client, cache);
  }
}
