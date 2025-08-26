import { Movie, MovieItem } from '~/entities/movie/movie';
import type { IMovie, IMovieItem } from '~/entities/movie/movie.types';
import type { IMovieDetailsData, IMovieListItemData } from './movie.types';

export const createMovieService = (baseUrl: string) => {
  return {
    async getAll(search?: string): Promise<IMovieItem[]> {
      const params = new URLSearchParams();
      if (search) {
        params.set('search', search);
      }
      return (
        (
          await fetch(`${baseUrl}/api/movies/?${params.toString()}`)
            .then(res => res.json())
            .then<IMovieListItemData[]>(data => data.data)
        )?.map(data => new MovieItem(data)) ?? []
      );
    },

    async getOneById(id: number): Promise<IMovie | undefined> {
      try {
        return new Movie(
          await fetch(`${baseUrl}/api/movies/${id}/`)
            .then(res => res.json())
            .then<IMovieDetailsData>(data => data.data)
        );
      } catch {
        return;
      }
    },
  };
};
