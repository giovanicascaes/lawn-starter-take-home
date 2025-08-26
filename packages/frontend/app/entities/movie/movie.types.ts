import type { IPeople } from '../people/people.types';
import type { IListItem } from '../shared.types';

export interface IMovie {
  id: number;
  title: string;
  openingCrawl: string;
  characters: IPeople[];
}

export interface IMovieItem extends IListItem {}
