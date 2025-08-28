import { getBackendUrl } from '~/lib/utils';
import { createMovieService } from '../movie/movie';
import { createPeopleService } from '../people/people';
import { makeQueryClient } from '../query/query';
import type { Provider } from './provider.types';

const baseUrl = getBackendUrl();

export const provider = (): Provider => ({
  movie: createMovieService(baseUrl),
  people: createPeopleService(baseUrl),
  query: makeQueryClient(),
});
