import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const [Year, setYear] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    const getYear = () => setYear(new Date().getFullYear());
    getYear();
  }, []);

  return (
    <footer className='bg-theme pt-7 pb-5'>
      <div className='nike-container text-slate-200'>
        <div className='grid items-start grid-cols-3 max-w-2xl w-full m-auto md:max-w-none md:gap-5'>
          <div className="grid items-center">
            <h1 className='text-lg lg:text-base md:text-sm uppercase font-semibold'>{t('footer.title')}</h1>
            <p className='text-sm sm:text-xs'>{t('footer.subtitle')}</p>
          </div>
        </div>
        <div className='mt-5 text-center'>
          <p className='text-sm md:text-center'>
            {t('footer.copyright')} <sup className='text-base font-bold'>&copy;</sup> <span className='font-semibold'>Melki Yossri {Year}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
