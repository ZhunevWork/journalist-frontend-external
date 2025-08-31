import { stepTwoDefaultValues } from '~/components/Form/FormPressRegistration/data';
import type { StepTwoFields } from '~/components/Form/FormPressRegistration/types';
import Input from '~/components/ui/Input';
import { Radio } from '~/components/ui/Radio';
import Upload from '~/components/ui/Upload';
import { loadFormFromSession, saveFormToSession } from '~/utils/FormSession';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

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
    mode: 'onChange',
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
      <div className="bg-(--bg-secondary) p-5 rounded-2xl mb-4 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <Radio
            id="smi"
            label="СМИ"
            value="smi"
            defaultChecked
            {...register('smi_type', { required: 'Обязательное поле' })}
          />
          <Radio
            id="bloger"
            label="Блогер/Фотограф"
            value="bloger"
            {...register('smi_type', { required: 'Обязательное поле' })}
          />
        </div>
      </div>

      <span className="text-(--gray) mb-1.5">Личное фото</span>

      <Upload multiple classNames="mb-4" />

      <Input
        label="Карта болельшика (необязательно)"
        value={values.fan_id}
        {...register('fan_id')}
        error={!!errors.fan_id}
        classNames="mb-4"
      />

      <span className="text-(--gray) mb-1.5 block">Тип аккредитации</span>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <Radio
          id="press"
          value="press"
          label="Пресса"
          defaultChecked
          {...register('accreditation_type', { required: 'Обязательное поле' })}
        />
        <Radio
          id="photo"
          value="photo"
          label="Фото"
          {...register('accreditation_type', { required: 'Обязательное поле' })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="password"
          label="Пароль"
          value={values.password}
          {...register('password', { required: 'Обязательное поле' })}
          error={!!errors.password}
        />

        <Input
          type="password"
          label="Повторите пароль"
          value={values.password_confirmation}
          {...register('password_confirmation', {
            required: 'Обязательное поле',
            validate: value =>
              value === watch('password') || 'Пароли должны совпадать',
          })}
          error={!!errors.password_confirmation}
        />
      </div>
    </div>
  );
}
