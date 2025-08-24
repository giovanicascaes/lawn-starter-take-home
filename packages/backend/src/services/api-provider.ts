import axios from 'axios';
import { type IApiConfig } from '../index.types';
import { CacheService } from './cache-service/cache.service';
import { MovieApiService } from './movie-api/movie-api.service';
import { PeopleApiService } from './people-api/people-api.service';

export class ApiProvider {
  readonly people: PeopleApiService;
  readonly movie: MovieApiService;

  constructor(config: IApiConfig, cache: CacheService) {
    const client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout,
      headers: config.headers,
    });
    this.people = new PeopleApiService(client, cache);
    this.movie = new MovieApiService(client, cache);
  }
}
