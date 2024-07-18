import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Cart, FlexContent, Footer, Hero, Navbar, Sales, Sidebar, Stories } from './components';
import { heroapi, toprateslaes, highlight, sneaker, story, footerAPI } from './data/data.js';
import Reclamation from './components/Reclamation';
import { getShoes, getWatches } from './api'; // Import the API functions for shoes and watches

const App = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [shoesData, setShoesData] = useState([]);
    const [watchesData, setWatchesData] = useState([]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const fetchShoesData = async () => {
            try {
                const data = await getShoes();
                console.log("Fetched shoes data:", data); // Log the fetched shoes data
                setShoesData({ title: "Our Shoes Collection", items: data });
            } catch (error) {
                console.error("Error fetching shoes data:", error);
            }
        };

        const fetchWatchesData = async () => {
            try {
                const data = await getWatches();
                console.log("Fetched watches data:", data); // Log the fetched watches data
                setWatchesData({ title: "Our Watches Collection", items: data });
            } catch (error) {
                console.error("Error fetching watches data:", error);
            }
        };

        fetchShoesData();
        fetchWatchesData();
    }, []);

    return (
        <Router>
            <Navbar onSidebarToggle={toggleSidebar} />
            {sidebarOpen && <Sidebar />}
            <Routes>
                <Route path="/reclamation" element={<Reclamation />} />
                <Route path="/" element={
                    <>
                        <Cart />
                        <main className={`flex flex-col gap-16 relative ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
                            <Hero heroapi={heroapi} /><br />
                            <FlexContent endpoint={sneaker} /><br />
                            <Sales endpoint={shoesData} ifExists /><br /> {/* Render shoes data */}
                            <FlexContent endpoint={highlight} ifExists />
                            <Sales endpoint={watchesData} /><br /> {/* Render watches data */}
                            <Reclamation />
                        </main>
                    </>
                } />
            </Routes>
            <Footer footerAPI={footerAPI} />
        </Router>
    );
};

export default App;
