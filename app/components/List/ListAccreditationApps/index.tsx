import type { IEvent } from '~/api/controllers/events/types';
import CardAccreditationApp from '~/components/Card/CardAccreditationApp';
import Slider from '~/components/ui/Slider';
import { useResponsive } from '~/hooks/useResponsive';

interface ListAccreditationAppsProps {
  events: IEvent[];
  selectedEventId?: number;
  onChangeActiveEvent: (eventId: number) => void;
}

export default function ListAccreditationApps(
  props: ListAccreditationAppsProps,
) {
  const { isLg } = useResponsive();
  const { events, onChangeActiveEvent, selectedEventId } = props;

  return isLg ? (
    <div className="p-8 rounded-3xl border border-(--gray-light) flex flex-col gap-4 overflow-auto bg-white min-w-[492px]">
      {events.map((event, index) => (
        <div>
          <CardAccreditationApp
            key={index}
            data={event}
            checked={selectedEventId === event.id}
            onChange={() => onChangeActiveEvent(event.id)}
          />
        </div>
      ))}
    </div>
  ) : (
    <Slider
      slides={events.map(event => ({
        id: event.id,
        content: (
          <div key={event.id}>
            <CardAccreditationApp
              data={event}
              checked={selectedEventId === event.id}
              onChange={() => onChangeActiveEvent(event.id)}
            />
          </div>
        ),
      }))}
    />
  );
}
