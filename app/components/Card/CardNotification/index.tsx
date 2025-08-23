import type { INotification } from '~/api/controllers/notifications/types';
import CardWrapper from '~/components/Card/CardWrapper';
import dayjs from 'dayjs';

type CardAccreditationProps = INotification;

export default function CardNotification(props: CardAccreditationProps) {
  const { title, message, type, read_at, created_at, updated_at } = props;

  return (
    <CardWrapper>
      <h4 className="text-lg mb-1 md:mb-2.5">{title}</h4>
      <p className="mb-4 ">{message}</p>
      <p className="mb-4 ">{dayjs(created_at).format('MM.DD dd, hh:mm')}</p>

      <span className="flex items-center gap-2">
        <img src="./icons/location.svg" alt="location" />
        РЖД Аренда
      </span>
    </CardWrapper>
  );
}
