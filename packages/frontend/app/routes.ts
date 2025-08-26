import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('layouts/app-layout/app-layout.tsx', [
    index('routes/home.tsx'),
    route('movie/:id', 'routes/movie.tsx'),
    route('people/:id', 'routes/people.tsx'),
  ]),
] satisfies RouteConfig;
