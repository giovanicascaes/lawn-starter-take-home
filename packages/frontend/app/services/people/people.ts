import { People, PeopleItem } from '~/entities/people/people';
import type { IPeople, IPeopleItem } from '~/entities/people/people.types';
import type { ICharacterDetailsData } from './people.types';

export const createPeopleService = (baseUrl: string) => {
  return {
    async getAll(search?: string): Promise<IPeopleItem[]> {
      const params = new URLSearchParams();
      if (search) {
        params.set('search', search);
      }
      return (
        (
          await fetch(`${baseUrl}/api/people/?${params.toString()}`)
            .then(res => res.json())
            .then<ICharacterDetailsData[]>(data => data.data)
        )?.map(data => new PeopleItem(data)) ?? []
      );
    },

    async getOneById(id: number): Promise<IPeople | undefined> {
      try {
        return new People(
          await fetch(`${baseUrl}/api/people/${id}`)
            .then(res => res.json())
            .then<ICharacterDetailsData>(data => data.data)
        );
      } catch {
        return;
      }
    },
  };
};
