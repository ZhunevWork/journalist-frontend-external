import { useEffect, useState } from 'react';

// Tailwind breakpoints (min-width)
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type Breakpoint = keyof typeof breakpoints;

type ResponsiveState = {
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2xl: boolean;
  active: Breakpoint | 'base';
};

export function useResponsive(): ResponsiveState {
  const getState = (): ResponsiveState => {
    const width = window.innerWidth;
    if (width >= breakpoints['2xl']) {
      return {
        isSm: true,
        isMd: true,
        isLg: true,
        isXl: true,
        is2xl: true,
        active: '2xl',
      };
    }
    if (width >= breakpoints.xl) {
      return {
        isSm: true,
        isMd: true,
        isLg: true,
        isXl: true,
        is2xl: false,
        active: 'xl',
      };
    }
    if (width >= breakpoints.lg) {
      return {
        isSm: true,
        isMd: true,
        isLg: true,
        isXl: false,
        is2xl: false,
        active: 'lg',
      };
    }
    if (width >= breakpoints.md) {
      return {
        isSm: true,
        isMd: true,
        isLg: false,
        isXl: false,
        is2xl: false,
        active: 'md',
      };
    }
    if (width >= breakpoints.sm) {
      return {
        isSm: true,
        isMd: false,
        isLg: false,
        isXl: false,
        is2xl: false,
        active: 'sm',
      };
    }
    return {
      isSm: false,
      isMd: false,
      isLg: false,
      isXl: false,
      is2xl: false,
      active: 'base',
    };
  };

  const [state, setState] = useState<ResponsiveState>(() => getState());

  useEffect(() => {
    const onResize = () => setState(getState());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return state;
}
