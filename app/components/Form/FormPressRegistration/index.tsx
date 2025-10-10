import { yupResolver } from '@hookform/resolvers/yup';
import { useRegisterMutation } from '~/api/controllers/auth';
import type { IRegisterArgs } from '~/api/controllers/auth/types';
import {
  stepOneDefaultValues,
  stepTwoDefaultValues,
} from '~/components/Form/FormPressRegistration/data';
import PressRegistrationStepTwo from '~/components/Form/FormPressRegistration/PressRegistartionStepTwo';
import PressRegistrationStepOne from '~/components/Form/FormPressRegistration/PressRegistrationStepOne';
import {
  formPressRegistrationValidationSchema,
  stepOneSchema,
  stepTwoSchema,
} from '~/components/Form/FormPressRegistration/utils/formPressRegistrationValidationSchema';
import Button from '~/components/ui/Button';
import Checkbox from '~/components/ui/Checkbox';
import Tabs, { Tab, type TabProps } from '~/components/ui/Tabs';
import { useTabs } from '~/hooks/useTabs';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const steps: TabProps[] = [
  { id: 1, title: 'Личная информация' },
  { id: 2, title: 'Аккредитация' },
];

interface FormPressRegistrationProps {
  setIsAuth: () => void;
}

export default function FormPressRegistration(
  props: FormPressRegistrationProps,
) {
  const { setIsAuth } = props;
  const [register] = useRegisterMutation();

  const [isStepValid, setIsStepValid] = useState(false);

  const { currentStep, setCurrentStep } = useTabs(1);

  const form = useForm<IRegisterArgs>({
    defaultValues: {
      ...stepOneDefaultValues,
      ...stepTwoDefaultValues,
    } as IRegisterArgs,
    mode: 'onSubmit',
    resolver: yupResolver(formPressRegistrationValidationSchema),
  });
  const { control, handleSubmit, formState } = form;
  const { isValid, errors } = formState;

  const isStepOneValid = async (data: IRegisterArgs): Promise<boolean> => {
    try {
      await stepOneSchema.validate(data, { abortEarly: false });
      return true;
    } catch {
      return false;
    }
  };

  const isSteTwoValid = async (data: IRegisterArgs): Promise<boolean> => {
    try {
      await stepTwoSchema.validate(data, { abortEarly: false });
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const checkValidity = async () => {
      const formData = form.getValues();
      const a = await isSteTwoValid(formData);

      if (currentStep === 1) {
        const isStepValid = await isStepOneValid(formData);
        setIsStepValid(isStepValid);
      }
    };

    const subscription = form.watch(() => {
      checkValidity();
    });

    checkValidity();

    return () => subscription.unsubscribe();
  }, [currentStep, form.watch, isValid]);

  const handleClick = () => currentStep === 1 && setCurrentStep(2);
  const onSubmit = (data: IRegisterArgs) => {
    console.log(data);

    register(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sm:p-12 rounded-3xl sm:border-1 sm:border-(--gray-light) sm:shadow-lg sm:shadow-gray-200 flex flex-col gap-8"
    >
      <h2 className="font-(family-name:--font-halvar) sm:text-4xl text-2xl">
        Регистрация
      </h2>

      <Tabs selectedId={currentStep} onChange={index => setCurrentStep(index)}>
        {steps.map(el => (
          <Tab {...el} disabled={currentStep === 1 && !isStepValid} />
        ))}
      </Tabs>

      {currentStep === 1 && <PressRegistrationStepOne form={form} />}
      {currentStep === 2 && <PressRegistrationStepTwo form={form} />}

      <Controller
        name="rules_agreement"
        control={control}
        render={({ field }) => (
          <Checkbox
            checked={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={!!errors.rules_agreement}
            label={
              <>
                Согласен с{' '}
                <a href="#" className="text-(--green) underline">
                  правилами сервиса
                </a>
              </>
            }
          />
        )}
      />

      <Button
        type={currentStep === 2 ? 'submit' : 'button'}
        classNames="w-full"
        onClick={handleClick}
        disabled={!isStepValid}
      >
        {currentStep === 1 ? 'Продолжить' : 'Оставить заявку'}
      </Button>

      <div className="flex justify-center">
        <span>Есть аккаунт?</span> &nbsp;
        <button
          onClick={setIsAuth}
          className="text-(--green) underline cursor-pointer"
        >
          Войти
        </button>
      </div>
    </form>
  );
}
