import Auth from '~/components/Form/FormPressAuth/Auth';
import AuthResponse from '~/components/Form/FormPressAuth/AuthResponse';
import EmailConfirmation from '~/components/Form/FormPressAuth/EmailConfirmation';
import RestorePassword from '~/components/Form/FormPressAuth/RestorePassword';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { setUserLogout } from '~/store/authSlice';
import { useState } from 'react';

interface FormPressAuthProps {
  setIsAuth: () => void;
}

export default function FormPressAuth({ setIsAuth }: FormPressAuthProps) {
  const dispatch = useAppDispatch();

  const profile = useAppSelector(s => s.auth.profileData);
  const user = useAppSelector(s => s.auth.userData);

  const [isRestore, setIsRestore] = useState<boolean>(false);

  return (
    <div className="md:p-12 md:max-w-[640px] w-full rounded-2xl md:rounded-3xl md:border border-(--gray-light) md:shadow-lg md:shadow-gray-200 flex flex-col gap-4 md:gap-8 relative">
      {(user?.email_verified === false || isRestore) && (
        <button
          className="w-fit hover:bg-(--gray-light) rounded-full md:absolute -left-15 top-5"
          onClick={() => {
            setIsRestore(false);
            dispatch(setUserLogout());
          }}
        >
          <img src="./icons/round-arrow.svg" alt="arrow" />
        </button>
      )}
      {isRestore ? (
        <RestorePassword setIsRestore={() => setIsRestore(false)} />
      ) : user?.email_verified === false ? (
        <EmailConfirmation />
      ) : profile?.is_approved === null ||
        profile?.is_approved === false ||
        profile?.deleted ? (
        <AuthResponse />
      ) : (
        <Auth setIsRestore={() => setIsRestore(true)} />
      )}

      {user?.email_verified !== false && !isRestore && (
        <div className="flex justify-center">
          <span>Нет аккаунта?</span>&nbsp;
          <button
            type="button"
            onClick={setIsAuth}
            className="text-(--green) underline cursor-pointer"
          >
            Зарегистрируйтесь
          </button>
        </div>
      )}
    </div>
  );
}
