import { isRouteErrorResponse, Outlet } from 'react-router';
import { ServiceProvider } from '../services/provider/provider.context';
import type { Route } from './+types/layout';

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

export default function Layout() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <div className="flex-1 flex flex-col items-center h-full">
        <header className="flex flex-col items-center w-full py-[7px] shadow-[0_1px_0_0_green-teal-gray]">
          <span className="text-[9px] font-bold text-brand">SWStarter</span>
        </header>
        <div className="flex flex-1 flex-col items-center w-full px-[119px] py-[15px] bg-[#ededed]">
          <ServiceProvider>
            <Outlet />
          </ServiceProvider>
        </div>
      </div>
    </main>
  );
}
