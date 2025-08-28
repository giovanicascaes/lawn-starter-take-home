export const isServer = typeof window === 'undefined';

export const getBackendUrl = () => {
  return isServer
    ? (import.meta.env.VITE_BACKEND_SSR_URL ?? 'http://backend:3001')
    : (import.meta.env.VITE_BACKEND_CSR_URL ?? 'http://localhost:3001');
};
