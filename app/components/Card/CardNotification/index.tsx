import { useSetReadNotificationsMutation } from '~/api/controllers/notifications';
import type { INotification } from '~/api/controllers/notifications/types';
import CardWrapper from '~/components/Card/CardWrapper';
import formatDate from '~/utils/formatDate';
import dayjs from 'dayjs';

type CardAccreditationProps = INotification;

export default function CardNotification(props: CardAccreditationProps) {
  const { read_at, id } = props;

  const [setReadNotification] = useSetReadNotificationsMutation();

  const handleRead = async (id: string) => {
    try {
      await setReadNotification(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardWrapper>
      <div className="  mb-1 md:mb-2.5 flex items-center">
        {!read_at && (
          <button
            className={'bg-red rounded-full p-2.5 cursor-pointer ml-[-10px]'}
            onClick={() => handleRead(id)}
          >
            <img
              src="./icons/status-notification.svg"
              alt="status notification"
            />
          </button>
        )}
        <div className="flex justify-between items-center w-full">
          <h4 className="text-lg font-bold">{props.data.message}</h4>
          <span className="text-(--txt-secondary)">
            {formatDate(props.created_at)}
          </span>
        </div>
      </div>
      <p className="mb-4 ">{props.data.model.event?.name}</p>
      <p className="mb-4 ">{props.data.model?.name}</p>
      {props.data.model.event?.date && (
        <p className="mb-4 ">
          {dayjs(props.data.model.event?.date).format('MM.DD dd, hh:mm')}
        </p>
      )}

      {props.data.model.date && (
        <p className="mb-4 ">
          {dayjs(props.data.model.date).format('MM.DD dd, hh:mm')}
        </p>
      )}

      {(props.data.model.location || props.data.model?.event?.location) && (
        <span className="flex items-center text-(--txt-secondary) gap-2">
          <img src="./icons/location.svg" alt="location" />
          {props.data.model.location || props.data.model?.event?.location}
        </span>
      )}
    </CardWrapper>
  );
}
