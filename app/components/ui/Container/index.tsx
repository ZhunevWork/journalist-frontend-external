import clsx from 'clsx';
import type { ReactNode } from 'react';

interface ContainerProps {
  children?: ReactNode;
  classNames?: string;
}

export default function Container({
  children,
  classNames = '',
}: ContainerProps) {
  return (
    <div className={clsx('container mx-auto px-4 ', classNames)}>
      {children}
    </div>
  );
}
