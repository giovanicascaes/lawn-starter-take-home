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
    eye_color: string;
    hair_color: string;
    films: TUrl[];
  };
  uid: string;
}

export interface ICharacterDetailsData {
  result?: ICharacterData;
}

export interface ICharacterItemData {
  uid: string;
  name: string;
}

export interface ICharacterListData {
  results?: ICharacterItemData[];
  result?: ICharacterData[];
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
  eye_color: string;
  hair_color: string;
  movies: Array<IMovieListItem>;
}

export interface IPeopleApiService extends IApiService {
  getList(search?: string): Promise<ICharacterListItem[]>;
  getOneById(id: number): Promise<ICharacterDetails>;
}
