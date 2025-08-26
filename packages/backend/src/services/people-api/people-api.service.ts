import { ApiService } from '../api-service/api-service';
import { IMovieDetailsData } from '../movie-api/movie-api.types';
import {
  ICharacterDetailsData,
  ICharacterListData,
  IPeopleApiService,
} from './people-api.types';

export class PeopleApiService extends ApiService implements IPeopleApiService {
  async getList(search?: string) {
    const url = '/people';
    const params = new URLSearchParams();
    if (search) {
      params.set('name', search);
    }
    const characters = await this.get<ICharacterListData>(
      `${url}?${params.toString()}`,
      `people:getList${search ? `:${search}` : ''}`
    );
    if (search) {
      return (
        characters.result?.map(character => {
          return {
            uid: character.uid,
            name: character.properties.name,
          };
        }) ?? []
      );
    }
    return (
      characters.results?.map(character => {
        return {
          uid: character.uid,
          name: character.name,
        };
      }) ?? []
    );
  }

  async getOneById(id: number) {
    const url = `/people/${id}`;
    const character = await this.get<ICharacterDetailsData>(
      url,
      `people:getOneById:${id}`
    );
    const {
      uid,
      properties: { films, ...characterData },
    } = character.result!;
    const movies = await Promise.all(
      character.result?.properties.films.map(movie =>
        this.get<IMovieDetailsData>(
          movie,
          `people:getOneById:${id}:movie:${movie}`
        )
      ) ?? []
    );
    return {
      uid,
      ...characterData,
      movies: movies.map(movie => {
        const {
          uid,
          properties: { title },
        } = movie.result!;
        return {
          uid,
          title,
        };
      }),
    };
  }
}
