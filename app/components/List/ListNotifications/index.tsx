import CardNotification from '~/components/Card/CardNotification';
import type { GetNotificationsArgs } from '~/api/controllers/notifications/types';

type Props = {
  data?: GetNotificationsArgs,
  isError: boolean;
}

export default function ListNotifications(props: Props) {
  const { data, isError } = props

  if (isError || !data) return null;

  return (
    <ul className="flex flex-col gap-4">
      {data.data.map(el => (
        <li key={el.id}>
          <CardNotification {...el} />
        </li>
      ))}

      <span className="text-gray-500 hidden">Нет новых уведомлений</span>
    </ul>
  );
}
