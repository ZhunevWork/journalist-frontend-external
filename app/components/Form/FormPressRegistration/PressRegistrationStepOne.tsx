import {
  stepOneDefaultValues,
  stepOneLabels,
} from '~/components/Form/FormPressRegistration/data';
import type { StepOneFields } from '~/components/Form/FormPressRegistration/types';
import DatePicker from '~/components/ui/DatePicker';
import Input from '~/components/ui/Input';
import { loadFormFromSession, saveFormToSession } from '~/utils/FormSession';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface PressRegistrationStepOneProps {
  onValidChange?: (valid: boolean) => void;
}

export default function PressRegistrationStepOne({
  onValidChange,
}: PressRegistrationStepOneProps) {
  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<StepOneFields>({
    defaultValues: stepOneDefaultValues,
    mode: 'onChange',
  });

  useEffect(() => {
    const saved = loadFormFromSession<StepOneFields>('pressStepOne');
    if (saved) {
      Object.entries(saved).forEach(([key, value]) => {
        setValue(key as keyof StepOneFields, value);
      });
    }
  }, [setValue]);

  const values = watch();
  useEffect(() => {
    saveFormToSession('pressStepOne', values);
  }, [values]);

  useEffect(() => {
    if (onValidChange) onValidChange(isValid);
  }, [isValid, onValidChange]);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="tel"
          value={values.phone}
          label={stepOneLabels.phone}
          {...register('phone', {
            required: 'Обязательное поле',
            pattern: {
              value: /^\+7\d{10}$/,
              message: 'Введите корректный номер телефона',
            },
          })}
          error={!!errors.phone}
        />

        <Input
          type="email"
          value={values.email}
          label={stepOneLabels.email}
          {...register('email', {
            required: 'Обязательное поле',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Введите корректную почту',
            },
          })}
          error={!!errors.email}
        />

        <Input
          value={values.last_name}
          label={stepOneLabels.last_name}
          {...register('last_name', { required: 'Обязательное поле' })}
          error={!!errors.last_name}
        />

        <Input
          value={values.name}
          label={stepOneLabels.name}
          {...register('name', { required: 'Обязательное поле' })}
          error={!!errors.name}
        />

        <Input
          value={values.middle_name}
          label={stepOneLabels.middle_name}
          {...register('middle_name')}
        />

        <Controller
          control={control}
          name="birthday"
          render={({ field, fieldState }) => (
            <DatePicker
              label={stepOneLabels.birthday}
              selected={field.value ? new Date(field.value) : undefined}
              onChange={date => field.onChange(date ? date.toISOString() : '')}
              error={!!fieldState.error}
            />
          )}
        />

        <div className="col-span-2 flex gap-4">
          <Input
            value={values.passport_series}
            label={stepOneLabels.passport_series}
            {...register('passport_series')}
            error={!!errors.passport_series}
            classNames="max-w-[165px]"
          />

          <Input
            value={values.passport_number}
            label={stepOneLabels.passport_number}
            {...register('passport_number')}
            error={!!errors.passport_number}
            classNames="max-w-[165px]"
          />

          <Controller
            control={control}
            name="issue_date"
            render={({ field, fieldState }) => (
              <DatePicker
                label={stepOneLabels.issue_date}
                selected={field.value ? new Date(field.value) : undefined}
                onChange={date =>
                  field.onChange(date ? date.toISOString() : '')
                }
                error={!!fieldState.error}
                classNames="max-w-[165px]"
              />
            )}
          />
        </div>

        <Input
          value={values.who_issues}
          label={stepOneLabels.who_issues}
          {...register('who_issues')}
          error={!!errors.who_issues}
        />

        <Input
          value={values.department_code}
          label={stepOneLabels.department_code}
          {...register('department_code')}
          error={!!errors.department_code}
        />

        <Input
          classNames="col-span-2"
          value={values.birth_place}
          label={stepOneLabels.birth_place}
          {...register('birth_place')}
          error={!!errors.birth_place}
        />
      </div>
    </div>
  );
}
