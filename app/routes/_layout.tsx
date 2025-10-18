import { initializeEcho, useUserNotifications } from '~/api/controllers/notifications/echo';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Menu from '~/components/Menu';
import Container from '~/components/ui/Container';
import { useAppSelector } from '~/hooks/redux';
import { useResponsive } from '~/hooks/useResponsive';
import { RouterPaths } from '~/routes';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router';

export default function AppLayout() {
  const userToken = useSelector((state: any) => state.auth.userToken);
  const profileData = useAppSelector(s => s.auth.profileData);
  const userData = useSelector((state: any) => state.auth.userData);

  const navigate = useNavigate();
  const location = useLocation();
  const { isMd } = useResponsive();
  const isAuthPage = location.pathname === RouterPaths.AUTH;
  const isResetPage = location.pathname === RouterPaths.RESET;
  const userId = userData?.id;


  console.log(location.pathname);

  useEffect(() => {
    if (userToken) {
      initializeEcho();
    }
  }, [userToken]);

  useEffect(() => {
    if (
      (!userToken && !isAuthPage) ||
      !profileData?.is_approved ||
      profileData.deleted
    ) {
      if (!isResetPage) navigate(RouterPaths.AUTH);
    } else if (userToken && isAuthPage) {
      navigate(RouterPaths.HOME);
    }
  }, [userToken, isAuthPage, navigate]);

  useUserNotifications(userId);

  // Если неавторизован и не на странице auth - не рендерим ничего
  if (!userToken && !isAuthPage && !isResetPage) {
    return null;
  }

  return (
    <>
      <div className="flex">
        <Container classNames="flex gap-6 md:gap-20">
          {!isAuthPage && !isResetPage && isMd && <Menu />}
          <div className="w-full">
            <Header />
            <main>
              <Outlet />
            </main>
          </div>
        </Container>
      </div>
      <Footer />
      <Container>{!isAuthPage && !isResetPage && !isMd && <Menu />}</Container>
    </>
  );
}
