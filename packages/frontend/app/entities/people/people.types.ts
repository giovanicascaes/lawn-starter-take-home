import type { IMovie } from '../movie/movie.types';
import type { IListItem } from '../shared.types';

export interface IPeople {
  id: number;
  name: string;
  birthYear: string;
  height: string;
  mass: string;
  eyeColor: string;
  hairColor: string;
  gender: string;
  movies: IMovie[];
}

export interface IPeopleItem extends IListItem {}
