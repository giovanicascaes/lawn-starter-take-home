import { data, NavLink, useLoaderData } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import { twMerge } from 'tailwind-merge';
import ResourceDetails, {
  ResourceDetailsItem,
} from '~/components/resource-details/resource-details';
import { getProvider } from '~/services/provider/provider.context';
import { movieQueries } from '~/services/query/queries';
import type { Route } from './+types/movie';

export async function loader({ params }: Route.LoaderArgs) {
  const movie = await getProvider().query.fetchQuery(
    movieQueries.detail(Number(params.id))
  );
  if (!movie) {
    throw data(`Movie Not Found: ${params.id}`, { status: 404 });
  }
  return {
    data: movie,
  };
}

export default function Movie() {
  const loaderData = useLoaderData<typeof loader>();
  const movie = loaderData.data!;
  return (
    <div className="flex flex-col items-center w-full max-w-[402px]">
      <ResourceDetails title={movie.title}>
        <div className="flex gap-x-[50px]">
          <ResourceDetailsItem title="Opening Crawl">
            {movie.openingCrawl}
          </ResourceDetailsItem>
          <ResourceDetailsItem title="Characters">
            {movie.characters.map((character, index, array) => (
              <Fragment key={character.id}>
                <NavLink
                  to={`/people/${character.id}`}
                  className={({ isPending }) =>
                    twMerge(isPending && 'opacity-50 hover:cursor-not-allowed')
                  }
                >
                  {character.name}
                </NavLink>
                {index < array.length - 1 && ', '}
              </Fragment>
            ))}
          </ResourceDetailsItem>
        </div>
      </ResourceDetails>
    </div>
  );
}

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Movie' }];
}
