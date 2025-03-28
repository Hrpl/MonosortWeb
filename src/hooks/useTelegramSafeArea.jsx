import { useEffect, useState } from 'react';

const useTelegramSafeArea = () => {
  const [safeArea, setSafeArea] = useState({
    top: 0,
    bottom: 0,
    isExpanded: false,
    isIOS: false
  });

  useEffect(() => {
    const tgWebApp = window.Telegram?.WebApp;
    if (!tgWebApp) return;

    const isIOS = tgWebApp.platform === 'ios' || /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    const updateSafeArea = () => {
      setSafeArea({
        top: tgWebApp.isExpanded ? 
          (isIOS ? 44 : 0) : 
          parseInt(tgWebApp.viewportStableHeight?.top || 0),
        bottom: tgWebApp.isExpanded ? 
          (isIOS ? 34 : 0) : 
          parseInt(tgWebApp.viewportStableHeight?.bottom || 0),
        isExpanded: tgWebApp.isExpanded,
        isIOS
      });
    };

    updateSafeArea();
    tgWebApp.onEvent('viewportChanged', updateSafeArea);

    return () => {
      tgWebApp.offEvent('viewportChanged', updateSafeArea);
    };
  }, []);

  return safeArea;
};

export default useTelegramSafeArea;