import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTotalQuantity, setOpenCart } from '../app/CartSlice.js';
import { HeartIcon, MagnifyingGlassIcon, ShoppingBagIcon, Bars3Icon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';
import { useTranslation } from 'react-i18next';
import EmotionBar from './EmotionBar'; // Import EmotionBar

const Navbar = ({ onSidebarToggle }) => {
    const [navState, setNavState] = useState(false);
    const dispatch = useDispatch();
    const totalQTY = useSelector(selectTotalQuantity);
    const { i18n, t } = useTranslation();

    const onCartToggle = () => {
        dispatch(setOpenCart({
            cartState: true
        }));
    };

    const changeLanguage = (e) => {
        const { value } = e.target;
        i18n.changeLanguage(value);
    }

    const onNavScroll = () => {
        if (window.scrollY > 30) {
            setNavState(true);
        } else {
            setNavState(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', onNavScroll);

        return () => {
            window.removeEventListener('scroll', onNavScroll);
        };
    }, []);
    
    return (
        <>
            <EmotionBar /> {/* Add EmotionBar here */}
            <header className={
                !navState ? 'fixed top-10 left-0 right-0 opacity-100 z-90 blur-effect-theme' : 'fixed top-10 left-0 right-0 h-[15vh] flex items-center justify-center opacity-100 z-100 blur-effect-theme'
            }>
                <nav className='flex items-center justify-between nike-container'>
                    <div className='flex items-center'>
                        <img
                            src={logo}
                            alt="logo/img"
                            className={`w-20 h-auto ${navState && "filter brightness-0"}`}
                        />
                    </div>
                    <ul className='flex items-center justify-center gap-2'>
                        <li className='grid items-center'>
                            <Bars3Icon onClick={onSidebarToggle} className={`icon-style ${navState && "text-slate-900  duration-300"}`} />
                        </li>
                      
                      
                        <li className='grid items-center'>
                            <button type='button' onClick={onCartToggle} className='border-none outline-none active:scale-110  duration-300 relative'>
                                <ShoppingBagIcon className={`icon-style ${navState && "text-slate-900  duration-300"}`} />
                                <div className={`absolute top-4 right-0 shadow w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110  duration-300 ${navState ? 'bg-slate-900 text-slate-100 shadow-slate-900' : 'bg-slate-100 text-slate-900 shadow-slate-100'}`}>{totalQTY}</div>
                            </button>
                        </li>
                        <li>
                            <select 
                                onChange={changeLanguage} 
                                className='border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 duration-300 p-1'
                            >
                                <option value="en">English</option>
                                <option value="fr">Français</option>
                                <option value="ar">العربية</option>
                            </select>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Navbar;
