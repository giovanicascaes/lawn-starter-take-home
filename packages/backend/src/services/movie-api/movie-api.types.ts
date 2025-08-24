import type { IApiService } from '../api-service/api-service.types';
import type { ICharacterListItem } from '../people-api/people-api.types';

export type TUrl = `https://www.swapi.tech/api/${string}`;

export interface IMovieData {
  properties: {
    title: string;
    opening_crawl: string;
    characters: [TUrl];
    url: TUrl;
  };
  uid: string;
}

export interface IMovieListData {
  message: string;
  result?: IMovieData[];
}

export interface IMovieDetailsData {
  message: string;
  result?: IMovieData;
}

// Return types for the transformed data
export interface IMovieListItem {
  uid: string;
  title: string;
}

export interface IMovieDetails {
  uid: string;
  title: string;
  opening_crawl: string;
  url: TUrl;
  characters: Array<ICharacterListItem>;
}

export interface IMovieApiService extends IApiService {
  getList(search?: string): Promise<IMovieListItem[]>;
  getOneById(id: number): Promise<IMovieDetails>;
}
