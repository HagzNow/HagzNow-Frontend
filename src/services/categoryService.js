import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

export const categoryService = {
    /**
     * Fetch all categories
     * @returns {Promise} API response
     */
    async getCategories() {
        try {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CATEGORIES}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (!result.isSuccess) {
                throw new Error(result.message || 'Failed to fetch categories');
            }

            return result.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },
};
