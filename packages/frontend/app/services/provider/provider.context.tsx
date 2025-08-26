import { createContext } from 'react';
import { isServer } from '~/lib/utils/utils';
import { provider } from './provider';
import type { Provider } from './provider.types';

function makeProvider() {
  return provider();
}

let apiProvider: Provider | undefined = undefined;

export function getProvider() {
  if (isServer) {
    return makeProvider();
  } else {
    if (!apiProvider) apiProvider = makeProvider();
    return apiProvider;
  }
}

export const ProviderContext = createContext<Provider | null>(null);

export const ServiceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ProviderContext.Provider value={getProvider()}>
      {children}
    </ProviderContext.Provider>
  );
};
