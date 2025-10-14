import { yupResolver } from '@hookform/resolvers/yup';
import { useResetMutation } from '~/api/controllers/auth';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import { useChangeParam } from '~/hooks/useSearch';
import { RouterPaths } from '~/routes';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import * as yup from 'yup';

const resetSchema = yup.object({
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(8, 'Пароль должен содержать минимум 8 символов'),
  password_confirmation: yup
    .string()
    .required('Подтверждение пароля обязательно')
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

type ResetFormData = yup.InferType<typeof resetSchema>;

export default function FormReset() {
  const { getParam } = useChangeParam();
  const navigate = useNavigate();

  const [reset, { isLoading }] = useResetMutation();

  const email = getParam('email');
  const token = getParam('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: yupResolver(resetSchema),
    mode: 'onSubmit',
  });

  const handleFormSubmit = (data: ResetFormData) => {
    if (!email || !token) {
      toast.error('Недостаточно данных для сброса пароля');
      return;
    }

    reset({
      email,
      token,
      password: data.password,
      password_confirmation: data.password_confirmation,
    })
      .unwrap()
      .then(() => {
        toast.success('Пароль успешно изменен');
        navigate(RouterPaths.AUTH);
      })
      .catch(error => {
        toast.error(error.data?.error || 'Произошла ошибка при сбросе пароля');
      });
  };

  return (
    <div className="md:p-12 rounded-2xl md:rounded-3xl md:border border-(--gray-light) md:shadow-lg md:shadow-gray-200 flex flex-col gap-4 md:gap-8 relative">
      <form
        noValidate
        className="flex flex-col md:w-md gap-8"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <h2 className="font-(--font-halvar) text-4xl">Подтвердите пароль</h2>

        <div>
          <Input
            type="password"
            label="Новый пароль"
            classNames="mb-4"
            {...register('password')}
            error={!!errors.password?.message}
          />
          <Input
            type="password"
            label="Повторите новый пароль"
            {...register('password_confirmation')}
            error={!!errors.password_confirmation?.message}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          Войти
        </Button>
      </form>
    </div>
  );
}
