import AccreditationsPageList from '~/components/AccreditationsPageList';
import FilterAccreditations from '~/components/Filters/FiltersAccreditation';

import type { Route } from '.react-router/types/app/routes/+types/accreditations';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Мои аккредитацию' }];
}

export default function Accreditations() {
  return (
    <div className="flex flex-col">
      <h1 className="font-(family-name:--font-halvar) md:text-4xl text-[22px] mb-8">
        Мои аккредитации
      </h1>

      <FilterAccreditations />

      <AccreditationsPageList />
    </div>
  );
}
