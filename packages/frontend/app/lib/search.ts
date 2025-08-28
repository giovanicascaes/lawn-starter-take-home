import { getProvider } from '~/services/provider/provider.context';
import { movieQueries, peopleQueries } from '~/services/query/queries';

export const searchFor = async (
  search: string,
  searchType: 'people' | 'movie'
) => {
  if (searchType === 'people') {
    const people = await getProvider().query.fetchQuery(
      peopleQueries.list(search)
    );
    return people.map(person => ({ ...person, url: `/people/${person.id}` }));
  }
  const movies = await getProvider().query.fetchQuery(
    movieQueries.list(search)
  );
  return movies.map(movie => ({ ...movie, url: `/movie/${movie.id}` }));
};
