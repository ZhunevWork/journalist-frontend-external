import { useLoginMutation } from '~/api/controllers/auth';
import type { ILoginArgs } from '~/api/controllers/auth/types';
import ModalBlockedJournalist from '~/components/Modal/ModalBlockedJournalist';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import { RouterPaths } from '~/routes';
import { setProfileData, setUserData, setUserToken } from '~/store/authSlice';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

export default function Auth({ setIsRestore }: { setIsRestore: () => void }) {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [isBlocked, setIsBlocker] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
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
        if (error?.status === 403) {
          setIsBlocker(true);
          reset();
        } else {
          setError('root', {
            type: 'manual',
            message: error?.data?.message || 'Неверный логин или пароль',
          });
        }
      });
  };

  return (
    <>
      {!isBlocked && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex w-full flex-col "
        >
          <h2 className="font-(--font-halvar) text-4xl mb-8">Вход</h2>
          <Input
            type="text"
            label="Email или номер телефона"
            {...register('email', { required: 'Это поле обязательно' })}
            error={!!errors.email?.message}
            autoComplete="username"
            classNames="mb-4"
          />

          <Input
            type="password"
            label="Пароль"
            {...register('password', { required: 'Это поле обязательно' })}
            error={!!errors.password?.message}
            autoComplete="current-password"
            classNames="mb-6"
          />

          <button
            type="button"
            className="mb-8 cursor-pointer"
            onClick={setIsRestore}
          >
            Забыли пароль?
          </button>

          {errors.root && (
            <div className="text-red-500 text-sm mb-4 md:mb-8">
              {errors.root.message}
            </div>
          )}

          <Button type="submit" disabled={isLoading || !isValid}>
            {isLoading ? 'Входим...' : 'Продолжить'}
          </Button>
        </form>
      )}

      {isBlocked && (
        <ModalBlockedJournalist onChange={() => setIsBlocker(false)} />
      )}
    </>
  );
}
