import { useEffect, useState } from 'react';

export const useSafeArea = () => {
  const [padding, setPadding] = useState({ top: 0, bottom: 0, iconTop: 0 });

  useEffect(() => {
    const tgApp = window.Telegram?.WebApp;
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    const calculatePaddings = () => {
      // Если не в Telegram WebApp
      if (!tgApp) {
        const top = isIOS ? 0 : 0;
        const bottom = isIOS ? 0 : 0;
        const iconTop = isIOS ? 6 : 6;
        return setPadding({ top, bottom, iconTop });
      }

      // Полноэкранный режим
      if (tgApp.isExpanded) {
        const top = isIOS ? 60 : 0;
        const bottom = isIOS ? 10 : 0;
        const iconTop = isIOS ? 60 : 6;
        setPadding({ top, bottom, iconTop });
      }
    };

    calculatePaddings();
    
    // Подписываемся на изменения
    if (tgApp) {
      tgApp.onEvent('viewportChanged', calculatePaddings);
    }
    window.addEventListener('resize', calculatePaddings);

    return () => {
      if (tgApp) {
        tgApp.offEvent('viewportChanged', calculatePaddings);
      }
      window.removeEventListener('resize', calculatePaddings);
    };
  }, []);

  return padding;
};