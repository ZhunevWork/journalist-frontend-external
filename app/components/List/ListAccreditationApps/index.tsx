import type { IEvent } from '~/api/controllers/events/types';
import CardAccreditationApp from '~/components/Card/CardAccreditationApp';

interface ListAccreditationAppsProps {
  events: IEvent[];
}

export default function ListAccreditationApps(
  props: ListAccreditationAppsProps,
) {
  const { events } = props;

  return (
    <div className="p-8 rounded-3xl border border-(--gray-light) flex flex-col gap-4 overflow-auto bg-white">
      {events.map(event => (
        <CardAccreditationApp data={event} />
      ))}
    </div>
  );
}
