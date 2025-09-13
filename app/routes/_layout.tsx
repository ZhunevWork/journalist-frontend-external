import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Menu from '~/components/Menu';
import Container from '~/components/ui/Container';
import { useResponsive } from '~/hooks/useResponsive';
import { RouterPaths } from '~/routes';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router';

export default function AppLayout() {
  const userToken = useSelector((state: any) => state.auth.userToken);
  const navigate = useNavigate();
  const location = useLocation();
  const { isMd } = useResponsive();
  const isAuthPage = location.pathname === RouterPaths.AUTH;

  useEffect(() => {
    if (!userToken && !isAuthPage) {
      navigate(RouterPaths.AUTH);
    } else if (userToken && isAuthPage) {
      navigate(RouterPaths.HOME);
    }
  }, [userToken, isAuthPage, navigate]);

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
