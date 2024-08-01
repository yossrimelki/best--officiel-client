import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Cart, FlexContent, Footer, Hero, Navbar, Sales, Sidebar, Stories, FlexVideoContent, EmotionBar } from './components';
import { heroapi, toprateslaes, highlight, sneaker, story } from './data/data.js';
import Reclamation from './components/Reclamation';
import ProductDetails from './components/ProductDetails';
import { getShoes, getWatchesGroupedBySubCategory, getCategories } from './api';
import Title from './components/utils/Title.jsx';
import ScrollToHash from './components/ScrollToHash'; // Import the new component

const App = () => {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shoesData, setShoesData] = useState([]);
  const [watchesData, setWatchesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchCategoriesAndWatches = async () => {
      try {
        const categoryList = await getCategories();
        setCategories(categoryList);

        const watchesDataPromises = categoryList.map(category =>
          getWatchesGroupedBySubCategory(category._id)
        );
        const watchesDataResults = await Promise.all(watchesDataPromises);

        const combinedWatchesData = categoryList.map((category, index) => ({
          category,
          subCategories: watchesDataResults[index] || []
        }));

        setWatchesData(combinedWatchesData);
      } catch (error) {
        console.error("Error fetching categories and watches data:", error);
      }
    };

    const fetchShoesData = async () => {
      try {
        const data = await getShoes();
        setShoesData({ title: t('highlight.ourShoesCollection'), items: data });
      } catch (error) {
        console.error("Error fetching shoes data:", error);
      }
    };

    fetchCategoriesAndWatches();
    fetchShoesData();
  }, [t]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const currentShoes = shoesData.items?.slice(0, currentPage * itemsPerPage) || [];

  return (
    <Router>
      <ScrollToHash /> {/* Add the ScrollToHash component here */}
      <div className="relative">
        <Navbar onSidebarToggle={toggleSidebar} />
        {sidebarOpen && <Sidebar isSidebarOpen={sidebarOpen} onSidebarClose={toggleSidebar} categories={categories} />}
        <Routes>
          <Route path="/reclamation" element={<Reclamation />} />
          <Route path="/product/:id" element={
            <>
              <Hero heroapi={heroapi} id="hero" />
              <Cart />
              <main className={`flex flex-col gap-16 relative ${sidebarOpen ? 'ml-64' : 'ml-0'} p-6`}>
                <ProductDetails />
              </main>
            </>
          } />
          <Route path="/" element={
            <>
              <Cart />
              <main className={`flex flex-col gap-16 relative ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
                <Hero heroapi={heroapi} id="hero" /><br />
                <FlexVideoContent endpoint={sneaker} id="flex-video-content" /><br />
                <Sales id="shoes" endpoint={{ title: shoesData.title, items: currentShoes }} ifExists gridClasses="grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1" />
                {shoesData.items && shoesData.items.length > currentShoes.length && (
                  <div className="flex justify-center">
                    <button
                      onClick={handleNextPage}
                      className="mt-4 px-6 py-3 bg-black text-white rounded-lg transition-transform transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      {t('highlight.seeMore')}
                    </button>
                  </div>
                )}
                {categories.map((category, index) => (
                  <div key={category._id} className="mb-10">
                    <FlexContent
                      id={`category-${category.name.replace(/\s+/g, '-').toLowerCase()}`} // Category name-based ID
                      endpoint={{
                        title: category.name,
                        heading: category.description,
                        text: '', // Adjust as needed
                        img: category.image, // Ensure 'image' is included in category data
                        btn: 'Scroll Down', // Button text can be customized
                        url: '#' // URL can be customized
                      }}
                      ifExists={index % 2 === 0} // Optional: Use condition for visual variety
                    />
                    {watchesData
                      .filter(data => data.category._id === category._id)
                      .map((categoryData, index) => (
                        <section key={index} id={`${category.name.replace(/\s+/g, '-').toLowerCase()}-${categoryData.category.name.replace(/\s+/g, '-').toLowerCase()}`} className="mt-10">
                          {categoryData.subCategories.map((subCategoryData, subIndex) => (
                            <div key={subIndex} className="mb-8">
                              <Sales
                                id={`${category.name.replace(/\s+/g, '-').toLowerCase()}-${subCategoryData.subCategoryName.replace(/\s+/g, '-').toLowerCase()}`}
                                endpoint={{ title: subCategoryData.subCategoryName, items: subCategoryData.items }}
                                gridClasses="grid-cols-3 xl:grid-cols-2 sm:grid-cols-1"
                              />
                            </div>
                          ))}
                        </section>
                      ))
                    }
                  </div>
                ))}
                <Reclamation />
              </main>
            </>
          } />
        </Routes>
        <Footer />
        <EmotionBar />
      </div>
    </Router>
  );
};

export default App;
