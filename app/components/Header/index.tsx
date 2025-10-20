import ListNotifications from '~/components/List/ListNotifications';
import Drawer from '~/components/ui/Drawer';
import { useAppSelector } from '~/hooks/redux';
import { RouterPaths } from '~/routes';
import { useState } from 'react';
import { Link } from 'react-router';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthPage = location.pathname === RouterPaths.AUTH;
  const token = useAppSelector(s => s.auth.userToken);
  const emailVerified = useAppSelector(s => s.auth.userData?.email_verified);
  const isApproved = useAppSelector(s => s.auth.userData?.is_approved);
  const notifications = useAppSelector(s => s.notifications.notifications);
  const hasUnread = notifications.some(el => el.read_at === null);

  const avatar = useAppSelector(
    s => s.auth.profileData?.profile_photo?.url ?? '',
  );

  return (
    <header className="w-full bg-white items-center flex">
      <div className="py-4 md:py-11 flex items-center w-full">
        {isAuthPage && (
          <img
            src="./icons/logo.svg"
            alt="logo"
            className="w-12 mr-20  h-12 md:w-auto md:h-auto"
          />
        )}

        {/* Меню: скрыто на мобилках */}
        <ul className="hidden md:flex items-center gap-8 md:gap-12 text-(--font-halvar) mr-auto ">
          <li>
            <Link to={''}>Поддержка</Link>
          </li>
          <li>
            <Link to={''}>FAQ</Link>
          </li>
        </ul>

        {/* Кнопки справа */}
        <div className="flex gap-3 md:gap-5 ml-auto">
          {token && emailVerified !== false && isApproved == true && (
            <>
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="h-12 w-12 md:h-[60px] md:w-[60px] relative rounded-full border border-(--gray-light) flex items-center justify-center cursor-pointer"
              >
                <img
                  src="./icons/bell.svg"
                  alt="bell"
                  className="w-5 h-5 md:w-6 md:h-6"
                />
                {hasUnread && (
                  <img
                    className="absolute right-2/6 top-2/8"
                    src="./icons/status-notification.svg"
                    alt="status notification"
                  />
                )}
              </button>

              <Link to={RouterPaths.PROFILE}>
                <div className="flex justify-center items-center h-12 w-12 md:h-[60px] md:w-[60px] rounded-full bg-(--bg-brand) overflow-hidden">
                  <img src={avatar ?? './icons/user-logo.svg'} alt="logo" />
                </div>
              </Link>
            </>
          )}

          {/* Мобильное меню (бургер) */}
          <button
            className="md:hidden mr-2 p-2 rounded-full hover:bg-gray-100 transition border border-(--gray-light) w-12 h-12 flex justify-center items-center"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Открыть меню"
          >
            {isMenuOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8337 4.1665L4.16699 15.8332M4.16699 4.1665L15.8337 15.8332"
                  stroke="#073830"
                  stroke-width="1.5"
                  stroke-linecap="square"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
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
            )}
          </button>
        </div>
      </div>

      {/* Drawer для уведомлений и мобильного меню */}
      <Drawer
        title="Уведомления"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        id="notifications-drawer"
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
