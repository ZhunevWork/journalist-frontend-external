import type { StepTwoFields } from '~/components/Form/FormPressRegistration/types';
import Input from '~/components/ui/Input';
import { Radio } from '~/components/ui/Radio';
import { loadFormFromSession, saveFormToSession } from '~/utils/FormSession';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const stepTwoDefaultValues: StepTwoFields = {};

interface PressRegistrationStepTwoProps {
  onValidChange?: (valid: boolean) => void;
}

export default function PressRegistrationStepTwo(
  props: PressRegistrationStepTwoProps,
) {
  const { onValidChange } = props;

  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<StepTwoFields>({
    defaultValues: stepTwoDefaultValues,
  });

  useEffect(() => {
    const saved = loadFormFromSession<StepTwoFields>('pressStepTwo');
    if (saved) {
      Object.entries(saved).forEach(([key, value]) => {
        setValue(key as keyof StepTwoFields, value);
      });
    }
  }, [setValue]);

  useEffect(() => {
    if (onValidChange) onValidChange(isValid);
    console.log('Step One Validity:', isValid);
  }, [isValid, onValidChange]);

  const values = watch();
  useEffect(() => {
    saveFormToSession('pressStepTwo', values);
  }, [values]);

  return (
    <div>
      <div className="bg-(--bg-secondary) p-2 pt-5 rounded-2xl mb-4 max-w-2xl">
        <div className="grid grid-cols-2 gap-4 mb-5">
          <Radio
            id="smi"
            label="СМИ"
            value="smi"
            defaultChecked
            {...register('role', { required: 'Обязательное поле' })}
          />
          <Radio
            id="bloger"
            label="Блогер/Фотограф"
            value="bloger"
            {...register('role', { required: 'Обязательное поле' })}
          />
        </div>

        <Input
          label="Название издания/канала"
          {...register('channel', { required: 'Обязательное поле' })}
          error={!!errors.channel}
        />

        <span className="mb-1.5 text-(--gray)">
          Скан удостоверения или письменное подтверждение
        </span>
      </div>

      <span className="text-(--gray) mb-1.5">Личное фото</span>

      <Input
        label="Карта болельшика"
        value={values.fanCard}
        {...register('fanCard', { required: 'Обязательное поле' })}
        error={!!errors.fanCard}
      />

      <span className="text-(--gray) mb-1.5">Тип аккредитации</span>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <Radio
          id="press"
          value="press"
          label="Пресса"
          defaultChecked
          {...register('type', { required: 'Обязательное поле' })}
        />
        <Radio
          id="photo"
          value="photo"
          label="Фото"
          {...register('type', { required: 'Обязательное поле' })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="password"
          label="Пароль"
          {...register('password', { required: 'Обязательное поле' })}
          error={!!errors.password}
        />
        <Input
          type="password"
          label="Повторите пароль"
          {...register('passwordRepeat', { required: 'Обязательное поле' })}
          error={!!errors.passwordRepeat}
        />
      </div>
    </div>
  );
}
