import { searchFor } from '~/lib/search';
import type { Route } from './+types/search';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') as string;
  const searchType = url.searchParams.get('searchType') as 'people' | 'movie';
  try {
    return {
      ok: true,
      data: await searchFor(search, searchType),
    };
  } catch {
    return {
      ok: false,
    };
  }
}
