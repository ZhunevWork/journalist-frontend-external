import { useLoginMutation } from '~/api/controllers/auth';
import type { ILoginBody } from '~/api/controllers/auth/types';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import { setUserToken } from '~/store/authSlice';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

interface FormPressAuthProps {
  setIsAuth: () => void;
}

export default function FormPressAuth({ setIsAuth }: FormPressAuthProps) {
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isValid },
  } = useForm<ILoginBody>();

  console.log(isLoading, 'a', !isValid);

  const values = watch();

  console.log(values);

  const onSubmit = async (data: ILoginBody) => {
    clearErrors('root');
    try {
      const res = await login(data).unwrap();
      dispatch(setUserToken(res.token));
      setIsAuth();
    } catch {
      setError('root', {
        type: 'manual',
        message: 'Неверный логин или пароль',
      });
    }
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
