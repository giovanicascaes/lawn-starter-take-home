import { useContext } from 'react';
import { ProviderContext } from './provider.context';

export const useServiceProvider = () => {
  const provider = useContext(ProviderContext);
  if (!provider) {
    throw new Error('Provider not found');
  }
  return provider;
};
