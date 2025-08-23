import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Menu from '~/components/Menu';
import Container from '~/components/ui/Container';
import { useResponsive } from '~/hooks/useResponsive';
import clsx from 'clsx';
import { Outlet, useLocation } from 'react-router';

export default function AppLayout() {
  const location = useLocation();
  const { isMd } = useResponsive();
  const isAuthPage = location.pathname === '/auth';

  return (
    <>
      <Header />
      <main className={isAuthPage ? '' : 'min-h-11/12 overflow-auto'}>
        <Container classNames="flex gap-6 md:gap-20">
          {!isAuthPage && isMd && <Menu />}
          <Outlet />
        </Container>
      </main>
      <Footer />
      <Container>{!isAuthPage && !isMd && <Menu />}</Container>
    </>
  );
}
