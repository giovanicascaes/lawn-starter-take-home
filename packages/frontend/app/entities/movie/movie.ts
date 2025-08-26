import type {
  IMovieDetailsData,
  IMovieListItemData,
} from '~/services/movie/movie.types';
import { People } from '../people/people';
import type { IPeople } from '../people/people.types';
import type { IMovie, IMovieItem } from './movie.types';

export class Movie implements IMovie {
  readonly id: number;
  readonly title: string;
  readonly openingCrawl: string;
  readonly characters: IPeople[];

  constructor(data: IMovieDetailsData) {
    this.id = Number(data.uid);
    this.title = data.title;
    this.openingCrawl = data.opening_crawl;
    this.characters =
      data.characters?.map(character => new People(character)) ?? [];
  }
}

export class MovieItem implements IMovieItem {
  readonly id: number;
  readonly name: string;

  constructor(data: IMovieListItemData) {
    this.id = Number(data.uid);
    this.name = data.title;
  }
}
