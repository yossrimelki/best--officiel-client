import { useEffect } from 'react';

const ScrollToHash = () => {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Scroll on initial load if there's a hash

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return null;
};

export default ScrollToHash;
