import FilterAccreditations from '~/components/Filters/FiltersAccreditation';
import ListAccreditations from '~/components/List/ListAccreditations';

import type { Route } from '.react-router/types/app/routes/+types/accreditations';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Мои аккредитацию' }];
}

export default function Accreditations() {
  return (
    <div className="flex flex-col">
      <h1 className="font-(family-name:--font-halvar) text-4xl mb-8">
        Мои аккредитации
      </h1>

      <FilterAccreditations />

      <div className="flex flex-wrap justify-between w-full gap-4">
        <ListAccreditations title="На рассмотрении" data={[1]} />
        <ListAccreditations title="Одобренные" data={[1, 2, 3]} />
      </div>
    </div>
  );
}
