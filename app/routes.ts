import {
  index,
  layout,
  route,
  type RouteConfig,
} from '@react-router/dev/routes';

export const enum RouterPaths {
  HOME = '/',
  AUTH = '/auth',
  PROFILE = '/profile',
  ACCREDITATIONS = '/accreditations',
  RESET = '/reset-password',
}

export default [
  layout('./routes/_layout.tsx', [
    index('routes/home.tsx'),
    route(RouterPaths.AUTH, 'routes/auth.tsx'),
    route(RouterPaths.PROFILE, './routes/profile.tsx'),
    route(RouterPaths.ACCREDITATIONS, 'routes/accreditations.tsx'),
    route(RouterPaths.RESET, 'routes/resetPassword.tsx'),
  ]),
] satisfies RouteConfig;
