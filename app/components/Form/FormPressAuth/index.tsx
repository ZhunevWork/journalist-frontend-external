import { useLoginMutation } from '~/api/controllers/auth';
import type { ILoginArgs } from '~/api/controllers/auth/types';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import { RouterPaths } from '~/routes';
import { setProfileData, setUserData, setUserToken } from '~/store/authSlice';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

interface FormPressAuthProps {
  setIsAuth: () => void;
}

export default function FormPressAuth({ setIsAuth }: FormPressAuthProps) {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<ILoginArgs>();

  const onSubmit = async (data: ILoginArgs) => {
    clearErrors('root');
    login(data)
      .unwrap()
      .then(res => {
        if (res?.token) {
          dispatch(setUserToken(res.token));
          dispatch(setUserData(res.user));
          dispatch(setProfileData(res.profile));
          navigate(RouterPaths.HOME);
        } else {
          setError('root', {
            type: 'manual',
            message: 'Неверная структура ответа сервера',
          });
        }
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setError('root', {
          type: 'manual',
          message: error?.data?.message || 'Неверный логин или пароль',
        });
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 md:p-12 rounded-2xl md:rounded-3xl border border-(--gray-light) shadow-lg shadow-gray-200 flex flex-col gap-4 md:gap-8"
      noValidate
    >
      <h2 className="font-(--font-halvar) text-4xl">Вход</h2>

      <Input
        type="text"
        label="Email или номер телефона"
        {...register('email', { required: 'Это поле обязательно' })}
        error={!!errors.email?.message}
        autoComplete="username"
      />

      <Input
        type="password"
        label="Пароль"
        {...register('password', { required: 'Это поле обязательно' })}
        error={!!errors.password?.message}
        autoComplete="current-password"
      />

      {errors.root && (
        <div className="text-red-500 text-sm">{errors.root.message}</div>
      )}

      <Button type="submit" disabled={isLoading || !isValid}>
        {isLoading ? 'Входим...' : 'Продолжить'}
      </Button>

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
    </form>
  );
}
