import { BellIcon, HouseIcon } from '~/components/Menu/icons';
import { RouterPaths } from '~/routes';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router';

const items = [
  {
    name: 'Главная',
    icon: HouseIcon,
    link: RouterPaths.HOME,
  },
  {
    name: 'Мои аккредитации',
    icon: BellIcon,
    link: RouterPaths.ACCREDITATIONS,
  },
];

export default function Menu() {
  const role = 'admin';
  const location = useLocation();

  return (
    <div className="flex md:flex-col items-center md:h-fit md:gap-8 md:justify-start justify-between pb-4 sticky md:bottom-auto bg-white top-0">
      {items.map((item, index) => {
        const isActive = location.pathname === item.link;

        return (
          <Link
            key={index}
            to={item.link}
            className={clsx(
              'flex justify-center items-center md:h-[60px] md:w-[60px] w-12 h-12 border border-(--gray-light) rounded-full cursor-pointer transition-all',
              isActive && 'bg-(--bg-brand) border-transparent',
            )}
            style={{
              transition: 'all 0.3s ease-in-out',
              borderRadius: isActive ? '12px' : '50%',
            }}
          >
            <item.icon color={isActive ? 'white' : null} />
          </Link>
        );
      })}
    </div>
  );
}
