import clsx from 'clsx';
import React, { useEffect } from 'react';

export interface ModalWrapperProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: string;
  classNames?: string;
}

export default function ModalWrapper(props: ModalWrapperProps) {
  const { open, onClose, children, title, classNames } = props;

  // Закрытие по Esc
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  // Закрытие по клику вне модала
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      onClick={onOverlayClick}
      className="fixed inset-0 z-50 flex items-end justify-center lg:items-center"
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={clsx(
          'bg-white relative rounded-t-[28px] lg:rounded-[28px]',
          'w-full lg:max-h-[80vh] lg:max-w-[720px] h-fit max-h-[90vh] lg:h-auto',
          'overflow-y-auto shadow-lg min-w-[320px] p-8 pb-12 lg:pb-8',
          classNames,
        )}
      >
        {title && <h2 className="text-xl font-semibold mb-7">{title}</h2>}
        <button
          onClick={onClose}
          className="p-2 rounded hover:bg-gray-100 transition absolute right-4 top-4"
          aria-label="Закрыть"
        >
          <svg
            width={24}
            height={24}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M6 6l12 12M6 18L18 6" stroke="var(--gray)" />
          </svg>
        </button>

        {children}
      </div>
    </div>
  );
}
