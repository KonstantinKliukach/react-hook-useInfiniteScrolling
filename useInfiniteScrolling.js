/* global window  document */
import { useEffect, useState, useCallback } from 'react';
import throttle from 'helpers/throttle';

function useInfiniteScrolling() {
  const [needToFetch, setNeedToFetch] = useState(false);

  const throttledScroll = useCallback(
    throttle(() => {
      handleScroll();
    }, 200),
  );

  const handleScroll = () => {
    const scrollPoint = Math.ceil(window.innerHeight + document.documentElement.scrollTop);
    if (scrollPoint === document.documentElement.offsetHeight) {
      console.log('We need to fetch more data, my lord!');
      setNeedToFetch(true);
    }
  };


  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);
  return [needToFetch, setNeedToFetch];
}

export default useInfiniteScrolling;
