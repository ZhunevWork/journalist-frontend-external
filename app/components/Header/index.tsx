import ListNotifications from '~/components/List/ListNotifications';
import Container from '~/components/ui/Container';
import Drawer from '~/components/ui/Drawer';
import { RouterPaths } from '~/routes';
import { useState } from 'react';
import { Link } from 'react-router';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white">
      <div className="py-4 md:py-6.5 flex items-center">
        {/* Меню: скрыто на мобилках */}
        <ul className="hidden md:flex items-center gap-8 md:gap-12 text-(--font-halvar) mr-auto ">
          <li>
            <Link to={''}>Поддержка</Link>
          </li>
          <li>
            <Link to={''}>FAQ</Link>
          </li>
        </ul>

        {/* Мобильное меню (бургер) */}
        <button
          className="md:hidden ml-auto mr-2 p-2 rounded-full hover:bg-gray-100 transition"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Открыть меню"
        >
          <svg
            width={28}
            height={28}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect x="4" y="7" width="20" height="2" rx="1" />
            <rect x="4" y="13" width="20" height="2" rx="1" />
            <rect x="4" y="19" width="20" height="2" rx="1" />
          </svg>
        </button>

        {/* Кнопки справа */}
        <div className="flex gap-3 md:gap-5">
          {/* <button
            onClick={() => setIsDrawerOpen(true)}
            className="h-10 w-10 md:h-[60px] md:w-[60px] rounded-full border border-(--gray-light) flex items-center justify-center cursor-pointer"
          >
            <img
              src="./icons/bell.svg"
              alt="bell"
              className="w-5 h-5 md:w-6 md:h-6"
            />
          </button> */}

          <Link to={RouterPaths.PROFILE}>
            <div className="h-10 w-10 md:h-[60px] md:w-[60px] rounded-full bg-red-500"></div>
          </Link>
        </div>
      </div>

      {/* Drawer для уведомлений и мобильного меню */}
      <Drawer
        title="Уведомления"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <ListNotifications />
      </Drawer>

      <Drawer
        title="Меню"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <div className="md:hidden mb-6">
          <ul className="flex flex-col gap-4 text-lg">
            <li>
              <Link to={''} onClick={() => setIsDrawerOpen(false)}>
                Поддержка
              </Link>
            </li>
            <li>
              <Link to={''} onClick={() => setIsDrawerOpen(false)}>
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </Drawer>
    </header>
  );
}
