import { useEffect } from 'react';

export const useTitle = (title: string) => {
  useEffect(() => {
    if (document.title !== title) document.title = title;
  }, [title]);
};
