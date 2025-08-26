import type { IMovieDetailsData } from '../movie/movie.types';

export interface ICharacterListItemData {
  uid: string;
  name: string;
}

export interface ICharacterDetailsData {
  uid: string;
  name: string;
  gender: string;
  height: string;
  mass: string;
  birth_year: string;
  eye_color: string;
  hair_color: string;
  movies: Array<IMovieDetailsData>;
}
