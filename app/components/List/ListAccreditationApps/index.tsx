import type { IEvent } from '~/api/controllers/events/types';
import CardAccreditationApp from '~/components/Card/CardAccreditationApp';

interface ListAccreditationAppsProps {
  events: IEvent[];
  onChangeActiveEvent: (event: IEvent) => void;
}

export default function ListAccreditationApps(
  props: ListAccreditationAppsProps,
) {
  const { events, onChangeActiveEvent } = props;

  return (
    <div className="p-8 rounded-3xl border border-(--gray-light) flex flex-col gap-4 overflow-auto bg-white">
      {events.map((event, index) => (
        <div onClick={() => onChangeActiveEvent(event)}>
          <CardAccreditationApp key={index} data={event} />
        </div>
      ))}
    </div>
  );
}
