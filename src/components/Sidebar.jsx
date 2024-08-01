import React, { useState, useEffect } from 'react';
import { HomeIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';
import { getSubCategoriesByCategoryId } from '../services/categoryService';

const Sidebar = ({ isSidebarOpen, onSidebarClose, categories }) => {
    const [subCategories, setSubCategories] = useState({});
    const [isCategoryOpen, setIsCategoryOpen] = useState({});

    const toggleCategory = async (categoryId) => {
        setIsCategoryOpen((prevState) => ({
            ...prevState,
            [categoryId]: !prevState[categoryId],
        }));

        if (!subCategories[categoryId]) {
            try {
                const subCategoriesData = await getSubCategoriesByCategoryId(categoryId);
                setSubCategories((prevState) => ({
                    ...prevState,
                    [categoryId]: subCategoriesData,
                }));
            } catch (error) {
                console.error('Error fetching subcategories', error);
            }
        }
    };

    const formatId = (categoryName, subCategoryName = '') => {
        return `${categoryName.toLowerCase().replace(/\s+/g, '-')}${subCategoryName ? '-' + subCategoryName.toLowerCase().replace(/\s+/g, '-') : ''}`;
    };

    return (
        <div
            className={`fixed top-0 left-0 right-0 bottom-0 blur-effect-theme duration-500 w-full h-screen z-[250] ${
                isSidebarOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-[-100%]'
            }`}
        >
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white text-gray-800 shadow-lg z-50 flex flex-col duration-500 ${
                    isSidebarOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-[-100%]'
                }`}
            >
                <div className="flex items-center justify-between h-16 bg-gray-100 px-4">
                    <img src={logo} alt="logo" className="w-12 h-auto" />
                    <button onClick={onSidebarClose} className="text-gray-600 focus:outline-none">
                        X
                    </button>
                </div>
                <nav className="mt-10 flex flex-col gap-4">
                    <a href="#hero" className="flex items-center gap-4 px-4 py-2 hover:bg-gray-200">
                        <HomeIcon className="w-6 h-6 text-gray-600" />
                        <span className="text-lg font-medium">Home</span>
                    </a>
                    {categories.map((category) => (
                        <div key={category._id} className="flex flex-col">
                            <button
                                className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-200"
                                onClick={() => toggleCategory(category._id)}
                            >
                                <span className="text-lg font-medium">{category.name}</span>
                                <span className="text-gray-600">{isCategoryOpen[category._id] ? '−' : '+'}</span>
                            </button>
                            <div
                                className={`pl-4 ${isCategoryOpen[category._id] ? 'block' : 'hidden'}`}
                            >
                                {subCategories[category._id] && subCategories[category._id].map((subCategory) => (
                                    <a
                                        key={subCategory._id}
                                        href={`#${formatId(category.name, subCategory.title)}`}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        {subCategory.title}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;
