import type { IEvent } from '~/api/controllers/events/types';
import CardWrapper from '~/components/Card/CardWrapper';
import { Radio } from '~/components/ui/Radio';
import dayjs from 'dayjs';

interface CardAccreditationAppProps {
  data: IEvent;
}

export default function CardAccreditationApp(props: CardAccreditationAppProps) {
  const { data } = props;

  console.log('data in card', data);

  return (
    <label>
      <CardWrapper>
        <div className="flex items-start gap-4">
          <Radio name="card" />
          <div>
            <h5 className="mb-4 font-bold text-lg">{data.name}</h5>
            <p className="mb-3">
              {dayjs(data.date).format('D.MM dd, HH:mm')} — {data.type}
            </p>
            <p className="flex items-center gap-2">
              <img src="./icons/location.svg" alt="location" /> {data.location}
            </p>
          </div>
        </div>
      </CardWrapper>
    </label>
  );
}
