import { initializeEcho } from '~/api/controllers/notifications/echo';
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

  const navigate = useNavigate();
  const location = useLocation();
  const { isMd } = useResponsive();
  const isAuthPage = location.pathname === RouterPaths.AUTH;

  initializeEcho();

  useEffect(() => {
    if (
      (!userToken && !isAuthPage) ||
      !profileData?.is_approved ||
      profileData.deleted
    ) {
      navigate(RouterPaths.AUTH);
    } else if (userToken && isAuthPage) {
      navigate(RouterPaths.HOME);
    }
  }, [userToken, isAuthPage, navigate]);

  // Если неавторизован и не на странице auth - не рендерим ничего
  if (!userToken && !isAuthPage) {
    return null;
  }

  return (
    <>
      <div className="flex">
        <Container classNames="flex gap-6 md:gap-20">
          {!isAuthPage && isMd && <Menu />}
          <div className="w-full">
            <Header />
            <main>
              <Outlet />
            </main>
          </div>
        </Container>
      </div>
      <Footer />
      <Container>{!isAuthPage && !isMd && <Menu />}</Container>
    </>
  );
}
