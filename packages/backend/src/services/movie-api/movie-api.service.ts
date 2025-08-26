import { ApiService } from '../api-service/api-service';
import type { ICharacterDetailsData } from '../people-api/people-api.types';
import type {
  IMovieApiService,
  IMovieDetailsData,
  IMovieListData,
} from './movie-api.types';

export class MovieApiService extends ApiService implements IMovieApiService {
  async getList(search?: string) {
    const url = '/films';
    const params = new URLSearchParams();
    if (search) {
      params.set('title', search);
    }
    const movies = await this.get<IMovieListData>(
      `${url}?${params.toString()}`,
      `movie:getList${search ? `:${search}` : ''}`
    );
    return (
      movies.result?.map(movie => {
        return {
          uid: movie.uid,
          title: movie.properties.title,
        };
      }) ?? []
    );
  }

  async getOneById(id: number) {
    const url = `/films/${id}`;
    const movie = await this.get<IMovieDetailsData>(
      url,
      `movie:getOneById:${id}`
    );
    const {
      uid,
      properties: { characters, ...movieData },
    } = movie.result!;
    const characterData = await Promise.all(
      movie.result?.properties.characters.map(character =>
        this.get<ICharacterDetailsData>(
          character,
          `movie:getOneById:${id}:character:${character}`
        )
      ) ?? []
    );
    return {
      uid,
      ...movieData,
      characters: characterData.map(character => {
        const {
          uid,
          properties: { name },
        } = character.result!;
        return {
          uid,
          name,
        };
      }),
    };
  }
}
