import type {
  ICharacterDetailsData,
  ICharacterListItemData,
} from '~/services/people/people.types';
import { Movie } from '../movie/movie';
import type { IMovie } from '../movie/movie.types';
import type { IPeople, IPeopleItem } from './people.types';

export class People implements IPeople {
  readonly id: number;
  readonly name: string;
  readonly birthYear: string;
  readonly eyeColor: string;
  readonly height: string;
  readonly mass: string;
  readonly hairColor: string;
  readonly gender: string;
  readonly movies: IMovie[];

  constructor(data: ICharacterDetailsData) {
    this.id = Number(data.uid);
    this.name = data.name;
    this.birthYear = data.birth_year;
    this.eyeColor = data.eye_color;
    this.hairColor = data.hair_color;
    this.height = data.height;
    this.mass = data.mass;
    this.gender = data.gender;
    this.movies = data.movies?.map(movie => new Movie(movie)) ?? [];
  }
}

export class PeopleItem implements IPeopleItem {
  readonly id: number;
  readonly name: string;

  constructor(data: ICharacterListItemData) {
    this.id = Number(data.uid);
    this.name = data.name;
  }
}
