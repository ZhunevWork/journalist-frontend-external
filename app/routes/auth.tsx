import FormPressAuth from '~/components/Form/FormPressAuth';
import FormPressRegistration from '~/components/Form/FormPressRegistration';
import Container from '~/components/ui/Container';
import { useEffect, useState } from 'react';

import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Локомотив' }];
}

export default function Auth() {
  const [isAuth, setIsAuth] = useState(true);

  return (
    <Container classNames="flex justify-center">
      {isAuth ? (
        <FormPressAuth setIsAuth={() => setIsAuth(false)} />
      ) : (
        <FormPressRegistration setIsAuth={() => setIsAuth(true)} />
      )}
    </Container>
  );
}
