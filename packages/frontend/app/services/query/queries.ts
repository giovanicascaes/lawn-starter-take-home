import { queryOptions } from '@tanstack/react-query';
import { getProvider } from '../provider/provider.context';

export const peopleQueries = {
  all: () => ['people'],
  lists: () => [...peopleQueries.all(), 'list'],
  list: (search: string) =>
    queryOptions({
      queryKey: [...peopleQueries.lists(), search],
      queryFn: () => getProvider().people.getAll(search),
    }),
  details: () => [...peopleQueries.all(), 'detail'],
  detail: (id: number) =>
    queryOptions({
      queryKey: [...peopleQueries.details(), id],
      queryFn: async () => (await getProvider().people.getOneById(id)) ?? null,
    }),
};
export const movieQueries = {
  all: () => ['movie'],
  lists: () => [...movieQueries.all(), 'list'],
  list: (search: string) =>
    queryOptions({
      queryKey: [...movieQueries.lists(), search],
      queryFn: () => getProvider().movie.getAll(search),
    }),
  details: () => [...movieQueries.all(), 'detail'],
  detail: (id: number) =>
    queryOptions({
      queryKey: [...movieQueries.details(), id],
      queryFn: async () => (await getProvider().movie.getOneById(id)) ?? null,
    }),
};
