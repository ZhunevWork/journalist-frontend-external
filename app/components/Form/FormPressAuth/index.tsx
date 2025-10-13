import Auth from '~/components/Form/FormPressAuth/Auth';
import AuthResponse from '~/components/Form/FormPressAuth/AuthResponse';
import EmailConfirmation from '~/components/Form/FormPressAuth/EmailConfirmation';
import { useAppSelector } from '~/hooks/redux';

interface FormPressAuthProps {
  setIsAuth: () => void;
}

export default function FormPressAuth({ setIsAuth }: FormPressAuthProps) {
  const profile = useAppSelector(s => s.auth.profileData);

  return (
    <div className="p-4 md:p-12 rounded-2xl md:rounded-3xl border border-(--gray-light) shadow-lg shadow-gray-200 flex flex-col gap-4 md:gap-8">
      {!profile?.email_confirm ? (
        <EmailConfirmation />
      ) : profile?.is_approved === null ||
        profile?.is_approved === false ||
        profile?.deleted ? (
        <AuthResponse />
      ) : (
        <Auth />
      )}

      {profile?.email_confirm && (
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
