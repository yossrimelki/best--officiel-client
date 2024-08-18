import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.bestofficiel.com/api',
  timeout: 150000
});

// Function to create a reclamation
export const createReclamation = async (data) => {
  try {
    const response = await api.post('/reclamation', data);
    return response.data;
  } catch (error) {
    console.error('Error creating reclamation:', error);
    throw error;
  }
};

// Function to create a commande
export const createCommande = async (data) => {
  try {
    let productType = 'Watch';
    if (data.items.some(item => item.sizes && item.sizes.length > 0)) {
      productType = 'Shoes';
    }

    const payload = {
      ...data,
      items: data.items.map(item => ({
        productId: item._id,
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

// Function to fetch shoes data
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

// Function to fetch watches data
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

// Function to fetch watches grouped by a specific category ID
export const getWatchesGroupedByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/watches/grouped-by-category/${categoryId}`, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching watches data by category ID:', error);
    return [];
  }
};

// Function to fetch all categories
export const getCategories = async () => {
  try {
    const response = await api.get('/categories/', {
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Function to fetch watches grouped by subcategories for a specific category ID
export const getWatchesGroupedBySubCategory = async (categoryId) => {
  try {
    const response = await api.get(`/categories/${categoryId}/subcategories`);
    const subCategories = response.data;

    const watchesDataPromises = subCategories.map(async (subCategory) => {
      const watchesResponse = await api.get(`/watches/sub-category/${subCategory.title}`);
      return {
        subCategoryName: subCategory.title,
        items: watchesResponse.data.items
      };
    });

    return await Promise.all(watchesDataPromises);
  } catch (error) {
    console.error('Error fetching watches data by subcategory:', error);
    return [];
  }
};
