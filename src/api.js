import axios from 'axios';

const api = axios.create({
  baseURL: 'https://testing-server-vercel.vercel.app/api',
  headers: {
    'Cache-Control': 'no-cache',
  },
  timeout: 150000
});

export const createReclamation = async (data) => {
  try {
    const response = await api.post('/reclamation', data);
    return response.data;
  } catch (error) {
    console.error('Error creating reclamation:', error);
    throw error;
  }
};
export const createCommande = async (data) => {
  try {
    // Determine productType based on items
    let productType = 'Watch';
    if (data.items.some(item => item.sizes && item.sizes.length > 0)) {
      productType = 'Shoes';
    }

    // Modify payload to match backend expectations
    const payload = {
      ...data,
      items: data.items.map(item => ({
        productId: item._id, // Send productId instead of _id
        productType: item.productType,
        title: item.title,
        quantity: item.quantity,
        price: item.price
      })),
      productType: productType,
    };

    const response = await api.post('/commandes', payload);

    if (!response.data) {
      throw new Error('Failed to create commande');
    }

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const getShoes = async () => {
  try {
      const response = await api.get('/shoes/', {
          headers: {
              'Cache-Control': 'no-cache',
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching shoes data:', error);
      return [];
  }
};

export const getWatches = async () => {
  try {
      const response = await api.get('/watches/', {
          headers: {
              'Cache-Control': 'no-cache',
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching watches data:', error);
      return [];
  }
};
