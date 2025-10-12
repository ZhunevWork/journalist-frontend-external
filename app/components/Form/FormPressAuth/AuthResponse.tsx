import Button from '~/components/ui/Button';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { setUserLogout } from '~/store/authSlice';
import clsx from 'clsx';

const getStatusData = (isApproved: null | boolean | undefined) => {
  switch (isApproved) {
    case null:
    case undefined:
      return {
        icon: './icons/clock.svg',
        text: 'На рассмотрении',
      };
    case false:
      return {
        icon: './icons/status/reject.svg',
        text: 'Отклонено',
      };
  }
};

export default function AuthResponse() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(s => s.auth.profileData);
  const is_approved = profile?.is_approved;
  const deleted = profile?.deleted;

  console.log(is_approved);

  const handleLogout = () => {
    dispatch(setUserLogout());
  };

  return (
    <div>
      <h2 className="font-bold md:text-4xl text-[22px] mb-8">
        {deleted && 'Аккаунт заблокирован'}
        {is_approved === null ? 'Рассмотрение заявки' : 'Заявка отклонена'}
      </h2>

      <div className="py-6 px-8 shadow-lg rounded-xl mb-8">
        <h3 className="text-lg mb-2.5 font-bold">
          Ваша заявка на регистрацию{' '}
          {is_approved === null ? 'находится на рассмотрении' : 'отклонена'}
        </h3>
        <p className="mb-10">
          Справочная служба{' '}
          <a href="#" className="text-(--green)">
            support@domain.ru
          </a>
        </p>

        <div className="flex items-center gap-4">
          <img src={getStatusData(is_approved)?.icon} alt="status" />
          <span
            className={clsx(
              'font-bold',
              is_approved === false && 'text-(--status-alert)',
            )}
          >
            {getStatusData(is_approved)?.text}
          </span>
        </div>
      </div>

      <Button onClick={handleLogout} classNames="w-full">
        Выйти
      </Button>
    </div>
  );
}
