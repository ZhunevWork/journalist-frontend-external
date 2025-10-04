import { BellIcon, HouseIcon } from '~/components/Menu/icons';
import { useResponsive } from '~/hooks/useResponsive';
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
  const location = useLocation();
  const { isMd } = useResponsive();

  return (
    <div className="flex md:flex-col items-center md:h-fit md:gap-8 md:justify-start justify-between pb-4 md:py-6 sticky md:bottom-auto bg-white top-0 gap-5">
      {isMd && (
        <img
          src="./icons/logo.svg"
          alt="logo"
          className="w-12 h-12 md:w-auto md:h-auto"
        />
      )}

      {items.map((item, index) => {
        const isActive = location.pathname === item.link;

        return (
          <Link
            key={index}
            to={item.link}
            className={clsx(
              'flex justify-center items-center md:h-[60px] md:w-[60px] w-full h-12 border border-(--gray-light) rounded-full cursor-pointer transition-all',
              isActive && 'bg-(--bg-brand) border-transparent',
            )}
            style={{
              transition: 'all 0.3s ease-in-out',
              borderRadius: isActive ? '12px' : '50px',
            }}
          >
            <item.icon color={isActive ? 'white' : null} />
          </Link>
        );
      })}
    </div>
  );
}
