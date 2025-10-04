import Contacts from '~/components/Footer/Contacts';
import Links from '~/components/Footer/Links';
import Socials from '~/components/Footer/Socials';
import Container from '~/components/ui/Container';

export default function Footer() {
  return (
    <footer className="md:pb-10 pb-5 mt-14 lg:mt-30">
      <Container classNames="flex flex-col-reverse md:flex-row md:flex-wrap items-start md:items-center justify-center gap-6 md:gap-10">
        <Socials />
        <Contacts />
        <Links />
      </Container>
    </footer>
  );
}
