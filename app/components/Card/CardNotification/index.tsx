import type { INotification } from '~/api/controllers/notifications/types';
import CardWrapper from '~/components/Card/CardWrapper';
import dayjs from 'dayjs';

type CardAccreditationProps = INotification;

export default function CardNotification(props: CardAccreditationProps) {
  return (
    <CardWrapper>
      <h4 className="text-lg mb-1 md:mb-2.5">{props.data.model.name}</h4>
      <p className="mb-4 ">{props.data.message}</p>
      <p className="mb-4 ">
        {dayjs(props.data.model.date).format('MM.DD dd, hh:mm')}
      </p>

      <span className="flex items-center gap-2">
        <img src="./icons/location.svg" alt="location" />
        {props.data.model.location || props.data.model.event.location}
      </span>
    </CardWrapper>
  );
}
