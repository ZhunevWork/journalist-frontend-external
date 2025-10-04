import React from 'react';

export interface TabProps {
  id: number;
  title: string;
  children?: React.ReactNode;
  disabled?: boolean;
  completed?: boolean;
}

interface TabsComponentProps {
  selectedId: number;
  onChange: (id: number) => void;
  children: React.ReactNode;
  className?: string;
}

// Компонент Tab для использования как дочерний элемент
export function Tab(props: TabProps) {
  return null;
}

export default function Tabs(props: TabsComponentProps) {
  const { selectedId, onChange, children, className = '' } = props;

  // Извлекаем данные из дочерних элементов - поддерживаем оба варианта
  const tabs = React.Children.toArray(children)
    .filter(child => React.isValidElement(child))
    .map((child, index) => {
      const element = child as React.ReactElement;
      const props = element.props as any;

      // Если это компонент Tab, используем его props
      if (element.type === Tab) {
        return {
          id: props.id,
          title: props.title,
          disabled: props.disabled || false,
          completed: props.completed || false,
          index,
          element: child,
          isTabComponent: true,
        };
      }
      // Если это другой компонент (например Button), генерируем данные автоматически
      else {
        // Автоматически определяем title из children
        const title =
          props.title ||
          (typeof props.children === 'string'
            ? props.children
            : `Tab ${index + 1}`);

        return {
          id: props.id || index + 1, // используем переданный id или генерируем автоматически
          title: title,
          disabled: props.disabled || false,
          completed: props.completed || false,
          index,
          element: child,
          isTabComponent: false,
        };
      }
    });

  // Проверяем, есть ли хотя бы один Tab компонент среди children
  const hasTabComponents = tabs.some(tab => tab.isTabComponent);

  const currentStepIndex = tabs.findIndex(tab => tab.id === selectedId) + 1;

  const isStepCompleted = (stepIndex: number) => {
    const tab = tabs[stepIndex];
    return tab.completed || stepIndex + 1 < currentStepIndex;
  };

  const isStepDisabled = (stepIndex: number) => {
    return tabs[stepIndex].disabled;
  };

  const handleStepClick = (stepIndex: number) => {
    const tab = tabs[stepIndex];
    if (!isStepDisabled(stepIndex)) {
      onChange(tab.id);
    }
  };

  const getStepStatus = (stepIndex: number) => {
    const stepNumber = stepIndex + 1;

    if (stepNumber === currentStepIndex) {
      return 'current';
    } else if (isStepCompleted(stepIndex)) {
      return 'completed';
    } else if (isStepDisabled(stepIndex)) {
      return 'disabled';
    } else {
      return 'upcoming';
    }
  };

  // Если есть Tab компоненты, отображаем стилизованные табы
  if (hasTabComponents) {
    return (
      <div className={`flex gap-2 justify-between items-center ${className}`}>
        {tabs.map((tab, index) => {
          const status = getStepStatus(index);
          const isClickable = !isStepDisabled(index);

          return (
            <React.Fragment key={tab.id}>
              {/* Рендерим стилизованные табы для визуального отображения */}
              <div
                className={`flex items-center gap-2.5 text-nowrap ${
                  isClickable ? 'cursor-pointer' : 'cursor-default'
                }`}
                onClick={() => handleStepClick(index)}
              >
                <span
                  className={`w-6 h-6 flex justify-center items-center rounded-full text-xs transition-colors ${
                    status === 'current'
                      ? 'bg-black text-white'
                      : status === 'completed'
                        ? 'bg-(--status-success) text-white'
                        : status === 'disabled'
                          ? 'bg-gray-300 text-gray-500'
                          : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {status === 'completed' ? (
                    <img
                      src="./icons/check.svg"
                      alt="check"
                      className="w-3 h-3"
                    />
                  ) : (
                    index + 1
                  )}
                </span>
                <span
                  className={`
                    text-sm font-medium
                    ${status === 'current' ? 'text-black' : ''}
                    ${status === 'completed' ? 'text-(--status-success)' : ''}
                    ${status === 'disabled' ? 'text-gray-400' : ''}
                    ${status === 'upcoming' ? 'text-gray-600' : ''}
                  `}
                >
                  {tab.title}
                </span>
              </div>

              {index < tabs.length - 1 && (
                <div
                  className={`w-full h-px mx-5 transition-colors ${
                    isStepCompleted(index)
                      ? 'bg-(--status-success)'
                      : 'bg-(--gray-light)'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  // Если нет Tab компонентов, отображаем оригинальные children с обработчиками
  return (
    <div className={`flex gap-2 justify-between items-center ${className}`}>
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              onClick: () => handleStepClick(index),
              key: index,
            } as any)
          : child,
      )}
    </div>
  );
}
