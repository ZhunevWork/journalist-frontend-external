import CalendarEvents from '~/components/CalendarEvents';
import ListAccreditations from '~/components/List/ListAccreditations';
import { useEffect } from 'react';
import { Link } from 'react-router';

import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Главная' }];
}

export default function Home() {
  useEffect(() => {
    return () => {
      sessionStorage.clear();
    };
  }, []);

  return (
    <div className="flex flex-col w-full">
      <h1 className="font-(family-name:--font-halvar) text-4xl mb-8">
        Главная
      </h1>
      <div className="flex flex-col xl:flex-row justify-between w-full gap-9">
        <CalendarEvents />

        <ListAccreditations
          title="Мои аккредитации"
          data={[1, 2, 3]}
          children={
            <Link
              to={`/accreditations`}
              className="text-(--gray) text-center w-full block"
            >
              Посмотреть все
            </Link>
          }
        />
      </div>
    </div>
  );
}
