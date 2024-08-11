import axios from 'axios';

// Fetch all categories
export const getCategories = async () => {
  const response = await axios.get('https://api.bestofficiel.com/api/categories');
  return response.data;
};

// Fetch subcategories by category ID
export const getSubCategoriesByCategoryId = async (categoryId) => {
  const response = await axios.get(`https://api.bestofficiel.com/api/categories/${categoryId}/subcategories`);
  return response.data;
};

