import React, { useEffect } from 'react';
import { useSafeArea } from '../../hooks/useSafeArea/useSafeArea';

export const SafeArea = ({ children }) => {
  const { top, bottom, iconTop } = useSafeArea();

  useEffect(() => {
    document.documentElement.style.setProperty('--safe-area-top', `${top}px`);
    document.documentElement.style.setProperty('--safe-area-bottom', `${bottom}px`);
    document.documentElement.style.setProperty('--safe-area-icon', `${iconTop}px`);
  }, [top, bottom, iconTop]);

  return (
    <div style={{
      paddingTop: 'var(--safe-area-top, 0px)',
      paddingBottom: 'var(--safe-area-bottom, 0px)',
      minHeight: 'calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px))',
      boxSizing: 'border-box'
    }}>
      {children}
    </div>
  );
};