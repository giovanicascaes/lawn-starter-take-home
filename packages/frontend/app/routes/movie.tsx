import { Link, useLoaderData } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import ResourceDetails, {
  ResourceDetailsItem,
} from '~/components/resource-details/resource-details';
import { getProvider } from '~/services/provider/provider.context';
import type { Route } from './+types/movie';

export async function loader({ params }: Route.LoaderArgs) {
  const movie = await getProvider().movie.getOneById(Number(params.id));
  return movie;
}

export default function Movie() {
  const movie = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col items-center w-full max-w-[402px]">
      <ResourceDetails title={movie?.title}>
        <div className="flex gap-x-[50px]">
          <ResourceDetailsItem title="Opening Crawl">
            {movie?.openingCrawl}
          </ResourceDetailsItem>
          <ResourceDetailsItem title="Characters">
            {movie?.characters.map(character => (
              <Fragment key={character.id}>
                <Link to={`/people/${character.id}`}>{character.name}</Link>
                ,{' '}
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
