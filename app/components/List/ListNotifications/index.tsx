import { useGetNotificationsQuery } from '~/api/controllers/notifications';
import CardNotification from '~/components/Card/CardNotification';

export default function ListNotifications(props) {
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
