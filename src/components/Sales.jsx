import React, { useState, useEffect } from 'react';
import Item from './utils/Item';
import Title from './utils/Title';
import { getWatches, getShoes } from '../api'; // Import the API functions for fetching watches and shoes

const Sales = ({ ifExists, endpoint }) => {
    const { title, items } = endpoint;
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                let data = [];
                if (title === "Our Watches Collection") {
                    data = await getWatches();
                } else if (title === "Our Shoes Collection") {
                    data = await getShoes();
                }
                console.log(`Fetched ${title} data:`, data); // Log the fetched data
                setProductData(data);
            } catch (error) {
                console.error(`Error fetching ${title.toLowerCase()} data:`, error);
            }
        };

        fetchProductData();
    }, [title]); // Dependency on `title` to refetch data when `title` changes

    return (
        <>
            <div className='nike-container'>
                <Title title={title} />
                <div className={`grid items-center justify-items-center gap-12 lg:gap-5 mt-7 ${ifExists ? 'grid-cols-3 xl:grid-cols-2 sm:grid-cols-1' : 'grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'}`}>
                    {productData.map((item, i) => (
                        <Item {...item} key={i} ifExists={ifExists} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Sales;
