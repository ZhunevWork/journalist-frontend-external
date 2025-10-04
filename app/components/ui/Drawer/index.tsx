import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';

import './styles.css';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
  width?: number | string;
  position?: 'right' | 'left' | 'bottom' | 'top';
  showCloseButton?: boolean;
}

export default function Drawer({
  open,
  onClose,
  title,
  header,
  children,
  width = 556,
  position = 'right',
  showCloseButton = true,
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Закрытие по Esc
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Блокировка скролла body
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Клик вне дроуэра
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Позиционирование
  const positionClasses = {
    right: 'right-0 top-0 h-full',
    left: 'left-0 top-0 h-full',
    bottom: 'left-0 bottom-0 w-full',
    top: 'left-0 top-0 w-full',
  }[position];

  // Ширина и скругление: на мобильных 90vw и без скругления, на md+ — width и скругление
  const drawerWidth =
    position === 'right' || position === 'left'
      ? typeof width === 'number'
        ? `${width}px`
        : width
      : 'fit-content';

  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          'fixed inset-0 z-50 bg-black bg-opacity-40 transition-opacity duration-300',
          open
            ? 'opacity-50 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
        onClick={handleOverlayClick}
        aria-hidden={!open}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={clsx(
          'fixed z-50 bg-(--bg-secondary) shadow-xl transition-transform duration-300 ease-in-out flex flex-col p-6',
          positionClasses,
          open
            ? 'translate-x-0 translate-y-0'
            : position === 'right'
              ? 'translate-x-full'
              : position === 'left'
                ? '-translate-x-full'
                : position === 'bottom'
                  ? 'translate-y-full'
                  : '-translate-y-full',
          // Скругление только на md+ экранах
          position === 'right'
            ? 'md:rounded-l-3xl'
            : position === 'left'
              ? 'md:rounded-r-3xl'
              : position === 'bottom'
                ? 'md:rounded-t-3xl'
                : 'rounded-b-2xl',
        )}
        style={
          position === 'right' || position === 'left'
            ? {
                width: drawerWidth,
                maxWidth: '100vw',
              }
            : {
                height: drawerWidth,
                maxHeight: '100vh',
              }
        }
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
      >
        <div className="drawer-adaptive flex flex-col h-full">
          {header ? (
            header
          ) : (
            <div className="flex items-center justify-between mb-6">
              {title && <div className="text-[22px] font-medium">{title}</div>}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-2 rounded hover:bg-gray-100 transition"
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
              )}
            </div>
          )}
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </>
  );
}
