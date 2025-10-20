import { useLazyGetNotificationsQuery } from '~/api/controllers/notifications';
import CardNotification from '~/components/Card/CardNotification';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import {
  addNotifications,
  setHasMore,
  setNotifications,
} from '~/store/notificationSlice';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function ListNotifications() {
  const dispatch = useAppDispatch();
  const { notifications, hasMore } = useAppSelector(s => s.notifications);
  const [page, setPage] = useState(1);
  const [fetchNotifications] = useLazyGetNotificationsQuery();

  useEffect(() => {
    const loadInitial = async () => {
      const response = await fetchNotifications({ page: 1 }).unwrap();
      dispatch(setNotifications(response.data));
      dispatch(setHasMore(!!response.links?.next));
      setPage(2);
    };

    loadInitial();
  }, [dispatch, fetchNotifications]);

  const loadMore = async () => {
    const response = await fetchNotifications({ page }).unwrap();
    dispatch(addNotifications(response.data));
    dispatch(setHasMore(!!response.links?.next));
    setPage(prev => prev + 1);
  };

  return (
    <InfiniteScroll
      dataLength={notifications.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<p>Загрузка...</p>}
      scrollableTarget="notifications-drawer"
    >
      <ul className="flex flex-col gap-4">
        {notifications.map(el => (
          <li key={el.id}>
            <CardNotification {...el} />
          </li>
        ))}

        <span className="text-gray-500 hidden">Нет новых уведомлений</span>
      </ul>
    </InfiniteScroll>
  );
}
