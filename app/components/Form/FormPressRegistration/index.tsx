import { useRegisterMutation } from '~/api/controllers/auth';
import PressRegistrationStepTwo from '~/components/Form/FormPressRegistration/PressRegistartionStepTwo';
import PressRegistrationStepOne from '~/components/Form/FormPressRegistration/PressRegistrationStepOne';
import Button from '~/components/ui/Button';
import Checkbox from '~/components/ui/Checkbox';
import React, { useState } from 'react';

const steps = ['Личная информация', 'Аккредитация'];

interface FormPressRegistrationProps {
  setIsAuth: () => void;
}

export default function FormPressRegistration(
  props: FormPressRegistrationProps,
) {
  const { setIsAuth } = props;
  const [register] = useRegisterMutation();

  const [step, setStep] = useState(1);
  const [isStepValid, setIsStepValid] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  const handleClick = () => {
    if (step === 1) {
      setStep(2);
    } else {
      const stepOneData = JSON.parse(
        sessionStorage.getItem('pressStepOne') || '{}',
      );
      const stepTwoData = JSON.parse(
        sessionStorage.getItem('pressStepTwo') || '{}',
      );
      const formData = {
        ...stepOneData,
        ...stepTwoData,
        rules_agreement: true,
      };

      register(formData);
    }
  };

  return (
    <div className="p-12 rounded-3xl border-1 border-(--gray-light) shadow-lg shadow-gray-200 flex flex-col gap-8">
      <h2 className="font-(family-name:--font-halvar) text-4xl">Регистрация</h2>

      <div className="flex justify-between items-center">
        {steps.map((item, index) => (
          <React.Fragment key={index}>
            <p className="flex items-center gap-2.5 text-nowrap">
              <span
                className={`w-6 h-6 flex justify-center items-center rounded-full text-xs 
								${
                  step === index + 1
                    ? 'bg-black text-white'
                    : index === 0 && step === 2
                      ? 'bg-(--status-success) text-white'
                      : 'bg-gray-100'
                }
								`}
              >
                {index === 0 && step === 2 ? (
                  <img src="./icons/check.svg" alt="check" />
                ) : (
                  index + 1
                )}
              </span>
              {item}
            </p>
            {index < steps.length - 1 && (
              <div className="w-full h-px bg-(--gray-light) mx-5" />
            )}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <PressRegistrationStepOne onValidChange={setIsStepValid} />
      )}
      {step === 2 && (
        <PressRegistrationStepTwo onValidChange={setIsStepValid} />
      )}

      <Checkbox
        checked={isAgree}
        onChange={() => setIsAgree(!isAgree)}
        label={
          <>
            Согласен с{' '}
            <a href="#" className="text-(--green) underline">
              правилами сервиса
            </a>
          </>
        }
      />

      <Button
        type="submit"
        classNames="w-full"
        onClick={handleClick}
        disabled={!isStepValid || (step === 2 && !isAgree)}
      >
        {step === 1 ? 'Продолжить' : 'Оставить заявку'}
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
    </div>
  );
}
