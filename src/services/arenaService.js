import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

export const arenaService = {
  /**
   * Fetch arenas with pagination and filters
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {string} params.location - Filter by location (optional)
   * @param {string} params.sport - Filter by sport type (optional)
   * @param {number} params.minPrice - Minimum price filter (optional)
   * @param {number} params.maxPrice - Maximum price filter (optional)
   * @returns {Promise} API response
   */
  async getArenas(params = {}) {
    try {
      const queryParams = new URLSearchParams();

      // Add pagination parameters
      queryParams.append('page', params.page || 1);
      queryParams.append('limit', params.limit || 12);

      // Add optional filters
      if (params.name) queryParams.append('name', params.name);
      if (params.categoryId) queryParams.append('categoryId', params.categoryId);
      if (params.location) queryParams.append('location', params.location);
      if (params.sport) queryParams.append('sport', params.sport);
      if (params.minPrice) queryParams.append('minPrice', params.minPrice);
      if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice);

      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.ARENAS}?${queryParams.toString()}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.isSuccess) {
        throw new Error(result.message || 'Failed to fetch arenas');
      }

      // Return the nested data structure with proper mapping
      return {
        data: result.data.data,
        total: result.data.total,
        page: result.data.page,
        limit: result.data.limit,
        totalPages: result.data.totalPages
      };
    } catch (error) {
      console.error('Error fetching arenas:', error);
      throw error;
    }
  },

  /**
   * Get arena by ID
   * @param {string} id - Arena ID
   * @returns {Promise} API response
   */
  async getArenaById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ARENAS}/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.isSuccess) {
        throw new Error(result.message || 'Failed to fetch arena');
      }

      return result.data;
    } catch (error) {
      console.error('Error fetching arena:', error);
      throw error;
    }
  },

  /**
   * Fetch arena requests (pending approval) with pagination
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise} API response
   */
  async getArenaRequests(params = {}) {
    try {
      const queryParams = new URLSearchParams();

      // Add pagination parameters
      queryParams.append('page', params.page || 1);
      queryParams.append('limit', params.limit || 100);

      // Get token from localStorage
      const token = localStorage.getItem('token');

      const headers = {
        'Content-Type': 'application/json',
      };

      // Add Authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.ARENAS}/requests?${queryParams.toString()}`,
        {
          method: 'GET',
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.isSuccess) {
        throw new Error(result.message || 'Failed to fetch arena requests');
      }

      // Return the nested data structure with proper mapping
      return {
        data: result.data.data,
        total: result.data.total,
        page: result.data.page,
        limit: result.data.limit,
        totalPages: result.data.totalPages
      };
    } catch (error) {
      console.error('Error fetching arena requests:', error);
      throw error;
    }
  },
};
