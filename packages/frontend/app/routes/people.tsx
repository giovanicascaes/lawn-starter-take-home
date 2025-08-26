import { Link, useLoaderData } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import ResourceDetails, {
  ResourceDetailsItem,
} from '~/components/resource-details/resource-details';
import { getProvider } from '~/services/provider/provider.context';
import type { Route } from './+types/people';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'People' }];
}
export async function loader({ request, params }: Route.LoaderArgs) {
  const people = await getProvider().people.getOneById(Number(params.id));
  return people;
}

export default function People() {
  const people = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col items-center w-full max-w-[402px]">
      <ResourceDetails title={people?.name}>
        <div className="flex gap-x-[50px]">
          <ResourceDetailsItem title="Details">
            {[
              {
                label: 'Birth Year',
                value: people?.birthYear,
              },
              {
                label: 'Gender',
                value: people?.gender,
              },
              {
                label: 'Eye Color',
                value: people?.eyeColor,
              },
              {
                label: 'Hair Color',
                value: people?.hairColor,
              },
              {
                label: 'Height',
                value: people?.height,
              },
              {
                label: 'Mass',
                value: people?.mass,
              },
            ].map(({ label, value }) => (
              <Fragment key={label}>
                {label}: {value}
                <br />
              </Fragment>
            ))}
          </ResourceDetailsItem>
          <ResourceDetailsItem title="Films">
            {people?.movies?.map(movie => (
              <Fragment key={movie.id}>
                <Link to={`/movie/${movie.id}`}>{movie.title}</Link>,{' '}
              </Fragment>
            ))}
          </ResourceDetailsItem>
        </div>
      </ResourceDetails>
    </div>
  );
}
