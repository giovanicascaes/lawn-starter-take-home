import type { IApiService } from '../api-service/api-service.types';
import type { IMovieListItem } from '../movie-api/movie-api.types';

export type TUrl = `https://www.swapi.tech/api/${string}`;

export interface ICharacterData {
  properties: {
    name: string;
    gender: string;
    height: string;
    mass: string;
    birth_year: string;
    films: TUrl[];
  };
  uid: string;
}

export interface ICharacterDataLean {
  uid: string;
  name: string;
}

export interface ICharacterListData {
  message: string;
  results?: ICharacterDataLean[];
}

export interface ICharacterDetailsData {
  message: string;
  result?: ICharacterData;
}

// Return types for the transformed data
export interface ICharacterListItem {
  uid: string;
  name: string;
}

export interface ICharacterDetails {
  uid: string;
  name: string;
  gender: string;
  height: string;
  mass: string;
  birth_year: string;
  movies: Array<IMovieListItem>;
}

export interface IPeopleApiService extends IApiService {
  getList(search?: string): Promise<ICharacterListItem[]>;
  getOneById(id: number): Promise<ICharacterDetails>;
}
