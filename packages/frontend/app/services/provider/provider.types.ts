import type { createMovieService } from '../movie/movie';
import type { createPeopleService } from '../people/people';
import type { makeQueryClient } from '../query/query';

export interface Provider {
  movie: ReturnType<typeof createMovieService>;
  people: ReturnType<typeof createPeopleService>;
  query: ReturnType<typeof makeQueryClient>;
}
