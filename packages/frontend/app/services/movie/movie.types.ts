import type { ICharacterDetailsData } from '../people/people.types';

export interface IMovieListItemData {
  uid: string;
  title: string;
}

export interface IMovieDetailsData {
  uid: string;
  title: string;
  opening_crawl: string;
  characters: Array<ICharacterDetailsData>;
}
