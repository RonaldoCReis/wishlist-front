import { useEffect, useState } from 'react';

type Breakpoint = {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  '2xl': boolean;
};

export const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState<number>();
  const [windowHeight, setWindowHeight] = useState<number>();
  const [breakpoint, setBreakpoint] = useState<Breakpoint>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
  });

  useEffect(() => {
    // Update window size on client-side
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    // Initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!windowWidth) return;

    const breakpoints = {
      xs: windowWidth < 640,
      sm: windowWidth >= 640,
      md: windowWidth >= 768,
      lg: windowWidth >= 1024,
      xl: windowWidth >= 1280,
      '2xl': windowWidth < 1536,
    };

    setBreakpoint(breakpoints);
  }, [windowWidth]);

  return { windowWidth, windowHeight, breakpoint };
};
