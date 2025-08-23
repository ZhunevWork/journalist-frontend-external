import {
  index,
  layout,
  route,
  type RouteConfig,
} from '@react-router/dev/routes';

export const enum RouterPaths {
  HOME = '/',
  AUTH = '/auth',
  STAFF = '/staff',
  EVENTS = '/events',
  PROFILE = '/profile',
  JOURNALISTS = '/journalists',
  ACCREDITATIONS = '/accreditations',
  REGISTRATION_APPS = '/registration_apps',
  ACCREDITATIONs_APPS = '/accreditation_apps',
}

export default [
  layout('./routes/_layout.tsx', [
    index('routes/home.tsx'),
    route(RouterPaths.AUTH, 'routes/auth.tsx'),
    route(RouterPaths.STAFF, './routes/staff.tsx'),
    route(RouterPaths.EVENTS, './routes/events.tsx'),
    route(RouterPaths.PROFILE, './routes/profile.tsx'),
    route(RouterPaths.JOURNALISTS, "./routes/journalits.tsx"),
    route(RouterPaths.ACCREDITATIONS, 'routes/accreditations.tsx'),
    route(RouterPaths.REGISTRATION_APPS, './routes/registrationApps.tsx'),
    route(RouterPaths.ACCREDITATIONs_APPS, './routes/accreditationApps.tsx'),
  ]),
] satisfies RouteConfig;
