import CalendarEvents from '~/components/CalendarEvents';
import HomePageList from '~/components/HomePageList';
import { useAppSelector } from '~/hooks/redux';
import { useEffect } from 'react';

import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Главная' }];
}

export default function Home() {
  const token = useAppSelector(state => state.auth.userToken);

  useEffect(() => {
    return () => {
      sessionStorage.clear();
    };
  }, []);

  if (!token) return null;

  return (
    <div className="flex flex-col w-full">
      <h1 className="font-(family-name:--font-halvar) text-4xl mb-8">
        Главная
      </h1>
      <div className="flex flex-col xl:flex-row justify-between w-full gap-9">
        <CalendarEvents />

        <HomePageList />
      </div>
    </div>
  );
}
