import { useEffect } from 'react';

export function useBodyScrollLock(opened) {
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [opened]);
}
