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
              value: /^\+?\d{10,15}$/,
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
          value={values.lastName}
          label={stepOneLabels.lastName}
          {...register('lastName', { required: 'Обязательное поле' })}
          error={!!errors.lastName}
        />

        <Input
          value={values.firstName}
          label={stepOneLabels.firstName}
          {...register('firstName', { required: 'Обязательное поле' })}
          error={!!errors.firstName}
        />

        <Input
          value={values.middleName}
          label={stepOneLabels.middleName}
          {...register('middleName', { required: 'Обязательное поле' })}
          error={!!errors.middleName}
        />

        <Controller
          control={control}
          name="birthDate"
          rules={{ required: 'Обязательное поле' }}
          render={({ field, fieldState }) => (
            <DatePicker
              label={stepOneLabels.birthDate}
              selected={field.value ? new Date(field.value) : undefined}
              onChange={date => field.onChange(date ? date.toISOString() : '')}
              error={!!fieldState.error}
            />
          )}
        />

        <div className="col-span-2 flex gap-4">
          <Input
            value={values.passportSeries}
            label={stepOneLabels.passportSeries}
            {...register('passportSeries', { required: 'Обязательное поле' })}
            error={!!errors.passportNumber}
            classNames="max-w-[165px]"
          />

          <Input
            value={values.passportNumber}
            label={stepOneLabels.passportNumber}
            {...register('passportNumber', { required: 'Обязательное поле' })}
            error={!!errors.passportNumber}
            classNames="max-w-[165px]"
          />

          <Controller
            control={control}
            name="passportIssueDate"
            rules={{ required: 'Обязательное поле' }}
            render={({ field, fieldState }) => (
              <DatePicker
                label={stepOneLabels.passportIssueDate}
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
          value={values.passportIssuedBy}
          label={stepOneLabels.passportIssuedBy}
          {...register('passportIssuedBy', {
            required: 'Обязательное поле',
          })}
          error={!!errors.passportIssuedBy}
        />

        <Input
          value={values.passportDivisionCode}
          label={stepOneLabels.passportDivisionCode}
          {...register('passportDivisionCode', {
            required: 'Обязательное поле',
          })}
          error={!!errors.passportDivisionCode}
        />

        <Input
          classNames="col-span-2"
          value={values.birthPlace}
          label={stepOneLabels.birthPlace}
          {...register('birthPlace', { required: 'Обязательное поле' })}
          error={!!errors.birthPlace}
        />
      </div>
    </div>
  );
}
