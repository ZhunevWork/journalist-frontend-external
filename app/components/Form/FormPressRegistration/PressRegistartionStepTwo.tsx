import type { IRegisterArgs } from '~/api/controllers/auth/types';
import Input from '~/components/ui/Input';
import { Radio } from '~/components/ui/Radio';
import Upload from '~/components/ui/Upload';
import { useEffect } from 'react';
import { Controller, type UseFormReturn } from 'react-hook-form';

interface PressRegistrationStepTwoProps {
  form: UseFormReturn<IRegisterArgs>;
}

export default function PressRegistrationStepTwo(
  props: PressRegistrationStepTwoProps,
) {
  const { form } = props;

  const {
    register,
    watch,
    control,
    clearErrors,
    formState: { errors },
  } = form;

  const values = watch();
  const smiType = watch('smi_type');

  useEffect(() => {
    if (smiType === 'mass_media') {
      clearErrors('smi_url');
    } else if (smiType === 'blogger/photographer') {
      clearErrors('documents');
    }
  }, []);

  return (
    <div>
      <div className="bg-(--bg-secondary) p-5 rounded-2xl mb-4 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <Radio
            id="smi"
            label="СМИ"
            value="mass_media"
            error={!!errors.smi_type}
            {...register('smi_type')}
          />
          <Radio
            id="bloger"
            label="Блогер/Фотограф"
            value="blogger/photographer"
            error={!!errors.smi_type}
            {...register('smi_type')}
          />
        </div>

        {smiType && (
          <div className="mt-4 space-y-4">
            <Input
              label="Название СМИ/Блога"
              value={values.smi_name}
              {...register('smi_name')}
              error={!!errors.smi_name}
            />

            {smiType === 'mass_media' && (
              <div>
                <span className="text-(--gray) mb-1.5 block">
                  Документы СМИ
                </span>
                <Controller
                  name="documents"
                  control={control}
                  render={({ field }) => (
                    <Upload
                      multiple
                      classNames="mb-4"
                      value={field.value || []}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            )}

            {smiType === 'blogger/photographer' && (
              <Input
                label="Ссылка на блог/соцсеть"
                value={values.smi_url}
                {...register('smi_url')}
                error={!!errors.smi_url?.message}
              />
            )}
          </div>
        )}
      </div>

      <div>
        <span className="text-(--gray) mb-1.5">Личное фото</span>
        <Controller
          name="profile_photo"
          control={control}
          render={({ field }) => (
            <Upload
              classNames="mb-4"
              accept="image/*"
              error={!!errors.profile_photo?.message}
              {...field}
            />
          )}
        />
      </div>

      <Input
        label="Карта болельщика (необязательно)"
        value={values.fan_id}
        {...register('fan_id')}
        error={!!errors.fan_id}
        classNames="mb-4"
      />

      <div>
        <span className="text-(--gray) mb-1.5 block">Тип аккредитации</span>
        <div className="grid grid-cols-2 gap-4 mb-5">
          <Radio
            id="press"
            value="press"
            label="Пресса"
            error={!!errors.accreditation_type}
            {...register('accreditation_type')}
          />
          <Radio
            id="photo"
            value="photo"
            label="Фото"
            error={!!errors.accreditation_type}
            {...register('accreditation_type')}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="password"
          label="Пароль"
          value={values.password}
          {...register('password')}
          error={!!errors.password}
        />

        <Input
          type="password"
          label="Повторите пароль"
          value={values.password_confirmation}
          {...register('password_confirmation')}
          error={!!errors.password_confirmation}
        />
      </div>
    </div>
  );
}
