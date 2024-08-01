import React, { useState, useEffect } from 'react';
import Item from './utils/Item';
import Title from './utils/Title';

const Sales = ({ ifExists, endpoint, id }) => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                if (endpoint.title) {
                    setProductData(endpoint.items);
                } else {
                    console.error("Unknown endpoint title:", endpoint.title);
                }
            } catch (error) {
                console.error(`Error fetching ${endpoint.title} data:`, error);
            }
        };

        fetchProductData();
    }, [endpoint]);

    return (
        <div className='nike-container' id={id}>
            <Title title={endpoint.title} />
            <div className={`grid items-center justify-items-center gap-12 lg:gap-5 mt-7 ${ifExists ? 'grid-cols-3 xl:grid-cols-2 sm:grid-cols-1' : 'grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'}`}>
                {productData.length > 0 ? (
                    productData.map((item, i) => (
                        <Item {...item} key={i} ifExists={ifExists} />
                    ))
                ) : (
                    <p>No items available in this category.</p>
                )}
            </div>
        </div>
    );
};

export default Sales;
