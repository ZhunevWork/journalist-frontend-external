import type { IRegisterArgs } from '~/api/controllers/auth/types';
import { stepOneLabels } from '~/components/Form/FormPressRegistration/data';
import DatePicker from '~/components/ui/DatePicker';
import Input from '~/components/ui/Input';
import { useEmailMask } from '~/hooks/useEmailMask';
import { usePhoneMask } from '~/hooks/usePhoneMask';
import { useEffect } from 'react';
import { Controller, type UseFormReturn } from 'react-hook-form';

interface PressRegistrationStepOneProps {
  form: UseFormReturn<IRegisterArgs>;
}

export default function PressRegistrationStepOne(
  props: PressRegistrationStepOneProps,
) {
  const { form } = props;

  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const {
    phone,
    onChange: onPhoneChange,
    onKeyDown: onPhoneKeyDown,
  } = usePhoneMask();
  const {
    email,
    onChange: onEmailChange,
    onKeyDown: onEmailKeyDown,
  } = useEmailMask();

  const values = watch();

  useEffect(() => {
    onPhoneChange(watch('phone') ?? '');
    onEmailChange(watch('email') ?? '');
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPhoneChange(e.target.value);
    setValue('phone', e.target.value, { shouldValidate: true });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEmailChange(e.target.value);
    setValue('email', e.target.value, { shouldValidate: true });
  };

  return (
    <div className="sm:grid sm:grid-cols-2 flex flex-col gap-4">
      <Controller
        control={control}
        name="phone"
        render={({ field, fieldState }) => (
          <Input
            type="tel"
            value={phone}
            label={stepOneLabels.phone}
            onKeyDown={onPhoneKeyDown}
            onChange={e => {
              field.onChange(e);
              handlePhoneChange(e);
            }}
            error={!!fieldState.error}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <Input
            type="email"
            value={email}
            label={stepOneLabels.email}
            onKeyDown={onEmailKeyDown}
            onChange={e => {
              field.onChange(e);
              handleEmailChange(e);
            }}
            error={!!fieldState.error}
          />
        )}
      />

      <Input
        value={values.last_name}
        label={stepOneLabels.last_name}
        {...register('last_name')}
        error={!!errors.last_name}
      />

      <Input
        value={values.name}
        label={stepOneLabels.name}
        {...register('name')}
        error={!!errors.name}
      />

      <Input
        value={values.middle_name}
        label={stepOneLabels.middle_name}
        {...register('middle_name')}
        error={!!errors.middle_name}
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

      <div className="col-span-2 sm:flex gap-4 grid grid-cols-2">
        <Input
          value={values.passport_series}
          label={stepOneLabels.passport_series}
          {...register('passport_series')}
          error={!!errors.passport_series}
          classNames="sm:max-w-[165px]"
          maxLength={4}
        />

        <Input
          value={values.passport_number}
          label={stepOneLabels.passport_number}
          {...register('passport_number')}
          error={!!errors.passport_number}
          classNames="sm:max-w-[165px]"
          maxLength={6}
        />

        <Controller
          control={control}
          name="issue_date"
          render={({ field, fieldState }) => (
            <DatePicker
              label={stepOneLabels.issue_date}
              selected={field.value ? new Date(field.value) : undefined}
              onChange={date => field.onChange(date ? date.toISOString() : '')}
              error={!!fieldState.error}
              classNames="sm:max-w-[165px] col-span-2"
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
        maxLength={7}
      />

      <Input
        classNames="col-span-2"
        value={values.birth_place}
        label={stepOneLabels.birth_place}
        {...register('birth_place')}
        error={!!errors.birth_place}
      />
    </div>
  );
}
