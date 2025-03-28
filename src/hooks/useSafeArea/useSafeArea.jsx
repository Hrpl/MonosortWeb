import { useEffect, useState } from 'react';

export const useSafeArea = () => {
  const [padding, setPadding] = useState({ top: 0, bottom: 0 });

  useEffect(() => {
    const tgApp = window.Telegram?.WebApp;
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    const calculatePaddings = () => {
      // Если не в Telegram WebApp
      if (!tgApp) {
        const top = isIOS ? 0 : 0;
        const bottom = isIOS ? 0 : 0;
        return setPadding({ top, bottom });
      }

      // Полноэкранный режим
      if (tgApp.isExpanded) {
        const top = isIOS ? 60 : 0;
        const bottom = isIOS ? 34 : 0;
        setPadding({ top, bottom });
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