import { useState } from 'react';

export const useTabs = (initialStep: number = 0) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const completeStep = (step: number) => {
    setCompletedSteps(prev =>
      [...prev, step].filter((v, i, a) => a.indexOf(v) === i),
    );
  };

  return {
    currentStep,
    completedSteps,
    setCurrentStep,
    nextStep,
    prevStep,
    completeStep,
  };
};

// Использование:
// const { currentStep, completedSteps, nextStep } = useTabs(1);
