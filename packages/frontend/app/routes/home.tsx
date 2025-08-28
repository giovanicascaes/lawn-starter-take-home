import { useEffect, useRef, useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';
import Button from '~/components/button/button';
import ContentCard from '~/components/content-card/content-card';
import DataMessage from '~/components/data-message/data-message';
import Input from '~/components/input/input';
import LinkButton from '~/components/link-button/link-button';
import ListSeparator from '~/components/list-separator/list-separator';
import { searchFor } from '~/lib/search';
import type { Route } from './+types/home';
import type { Route as SearchRoute } from './+types/search';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Lawn Starter API' },
    { name: 'description', content: 'Lawn Starter API' },
  ];
}

export async function clientLoader() {
  const search = localStorage.getItem('search');
  const searchType = localStorage.getItem('searchType') as 'people' | 'movie';
  if (search && searchType) {
    localStorage.removeItem('search');
    localStorage.removeItem('searchType');
    try {
      return {
        ok: true,
        data: await searchFor(search, searchType),
        search,
        searchType,
      };
    } catch {
      return {
        ok: false,
      };
    }
  }
  return null;
}

export function HydrateFallback() {
  return <span className="text-[9px] font-bold text-black">Loading...</span>;
}

export default function Home() {
  const fetcher = useFetcher<SearchRoute.ComponentProps['loaderData']>();
  const loaderData = useLoaderData<typeof clientLoader>();
  const [search, setSearch] = useState(loaderData?.search ?? '');
  const [searchType, setSearchType] = useState<'people' | 'movie'>(
    loaderData?.searchType ?? 'people'
  );
  const formValuesRef = useRef<{
    search: string;
    searchType: 'people' | 'movie';
  }>({ search, searchType });

  useEffect(() => {
    return () => {
      localStorage.setItem('search', formValuesRef.current.search);
      localStorage.setItem('searchType', formValuesRef.current.searchType);
    };
  }, []);

  const data = fetcher.data?.data ?? loaderData?.data;
  const error = (fetcher.data?.ok ?? loaderData?.ok) === false;

  return (
    <div className="flex flex-col items-center w-full">
      <aside className="flex gap-x-[15px]">
        <fetcher.Form method="get" action="/search">
          <ContentCard className="gap-y-2.5 w-[205px]">
            <fieldset className="text-unamed-gray text-[7px] flex gap-x-[15px]">
              <legend className="font-semibold mb-2.5">
                What are you searching for?
              </legend>
              {[
                { id: 'peopleOption', value: 'people', label: 'People' },
                { id: 'movieOption', value: 'movie', label: 'Movie' },
              ].map(({ id, value, label }) => (
                <div key={id} className="flex items-center gap-x-[5px]">
                  <input
                    type="radio"
                    id={id}
                    name="searchType"
                    value={value}
                    checked={searchType === value}
                    onChange={e => {
                      const typedValue = e.target.value as 'people' | 'movie';
                      formValuesRef.current.searchType = typedValue;
                      setSearchType(typedValue);
                    }}
                  />
                  <label htmlFor={id} className="font-bold text-black">
                    {label}
                  </label>
                </div>
              ))}
            </fieldset>
            <Input
              name="search"
              placeholder={
                searchType === 'people'
                  ? 'e.g. Chewbacca, Yoda, Boba Fett'
                  : 'e.g. The Empire Strikes Back'
              }
              value={search}
              onChange={e => {
                formValuesRef.current.search = e.target.value;
                setSearch(e.target.value);
              }}
            />
            <Button
              className="w-full"
              disabled={!search.trim() || fetcher.state !== 'idle'}
              type="submit"
            >
              {fetcher.state !== 'idle' ? 'SEARCHING...' : 'SEARCH'}
            </Button>
          </ContentCard>
        </fetcher.Form>
        <ContentCard className="w-[291px] min-h-[291px]">
          <span className="font-bold text-black text-[9px] mb-[5px]">
            Results
          </span>
          <ListSeparator />
          <div className="flex flex-1 flex-col items-center">
            {fetcher.state === 'idle' && data?.length ? (
              <ul className="w-full">
                {data.map(item => (
                  <li key={item.id} className="flex flex-col">
                    <div className="h-[26px] flex items-center justify-between w-full">
                      <span className="text-[8px] text-black font-bold">
                        {item.name}
                      </span>
                      <LinkButton to={item.url}>SEE DETAILS</LinkButton>
                    </div>
                    <ListSeparator />
                  </li>
                ))}
              </ul>
            ) : (
              <DataMessage>
                {fetcher.state !== 'idle'
                  ? 'Searching...'
                  : error
                    ? 'There is an error. Please try again.'
                    : 'There are zero matches.Use the form to search for People or Movies.'}
              </DataMessage>
            )}
          </div>
        </ContentCard>
      </aside>
    </div>
  );
}
