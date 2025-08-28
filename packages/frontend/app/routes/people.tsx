import { data, NavLink, useLoaderData } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import { twMerge } from 'tailwind-merge';
import ResourceDetails, {
  ResourceDetailsItem,
} from '~/components/resource-details/resource-details';
import { getProvider } from '~/services/provider/provider.context';
import { peopleQueries } from '~/services/query/queries';
import type { Route } from './+types/people';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'People' }];
}
export async function loader({ params }: Route.LoaderArgs) {
  const people = await getProvider().query.fetchQuery(
    peopleQueries.detail(Number(params.id))
  );
  if (!people) {
    throw data(`People Not Found: ${params.id}`, { status: 404 });
  }
  return {
    data: people,
  };
}

export default function People() {
  const loaderData = useLoaderData<typeof loader>();
  const people = loaderData.data!;
  return (
    <div className="flex flex-col items-center w-full max-w-[402px]">
      <ResourceDetails title={people.name}>
        <div className="flex gap-x-[50px]">
          <ResourceDetailsItem title="Details">
            {[
              {
                label: 'Birth Year',
                value: people.birthYear,
              },
              {
                label: 'Gender',
                value: people.gender,
              },
              {
                label: 'Eye Color',
                value: people.eyeColor,
              },
              {
                label: 'Hair Color',
                value: people.hairColor,
              },
              {
                label: 'Height',
                value: people.height,
              },
              {
                label: 'Mass',
                value: people.mass,
              },
            ].map(({ label, value }) => (
              <Fragment key={label}>
                {label}: {value}
                <br />
              </Fragment>
            ))}
          </ResourceDetailsItem>
          <ResourceDetailsItem title="Films">
            {people.movies.map((movie, index, array) => (
              <Fragment key={movie.id}>
                <NavLink
                  to={`/movie/${movie.id}`}
                  className={({ isPending }) =>
                    twMerge(isPending && 'opacity-50 hover:cursor-not-allowed')
                  }
                >
                  {movie.title}
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
