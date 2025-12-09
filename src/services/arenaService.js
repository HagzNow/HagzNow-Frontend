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

      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ARENAS}?${queryParams.toString()}`);

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
        totalPages: result.data.totalPages,
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
   * @param {string} params.name - Filter by name (optional)
   * @param {string} params.categoryId - Filter by category (optional)
   * @returns {Promise} API response
   */
  async getArenaRequests(params = {}) {
    try {
      const queryParams = new URLSearchParams();

      // Add pagination parameters
      queryParams.append('page', params.page || 1);
      queryParams.append('limit', params.limit || 100);

      // Add optional filters
      if (params.name) queryParams.append('name', params.name);
      if (params.categoryId) queryParams.append('categoryId', params.categoryId);

      // Add status filter to only get pending arenas
      // Temporarily comment out to see all arenas
      // queryParams.append('status', 'pending');

      // Get token from localStorage
      const token = localStorage.getItem('token');

      const headers = {
        'Content-Type': 'application/json',
      };

      // Add Authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const url = `${API_BASE_URL}${API_ENDPOINTS.ARENAS}/requests?${queryParams.toString()}`;
      console.log('Fetching arena requests from:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      console.log('Arena requests result:', result);

      // Handle response structure: result.data contains the actual data object
      return {
        data: result.data.data || [],
        total: result.data.total || 0,
        page: result.data.page || 1,
        limit: result.data.limit || 10,
        totalPages: result.data.totalPages || 0,
      };
    } catch (error) {
      console.error('Error fetching arena requests:', error);
      throw error;
    }
  },

  /**
   * Update arena status (approve/reject)
   * @param {string} id - Arena ID
   * @param {string} status - New status: "active" or "disabled"
   * @returns {Promise} API response
   */
  async updateArenaStatus(id, status) {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');

      const headers = {
        'Content-Type': 'application/json',
      };

      // Add Authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ARENAS}/${id}/status`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.isSuccess) {
        throw new Error(result.message || 'Failed to update arena status');
      }

      return result.data;
    } catch (error) {
      console.error('Error updating arena status:', error);
      throw error;
    }
  },

  /**
   * Approve arena (change status from pending to active)
   * @param {string} id - Arena ID
   * @returns {Promise} API response
   */
  async approveArena(id) {
    try {
      const token = localStorage.getItem('token');

      const headers = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      console.log('Approving arena:', id);

      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ARENAS}/${id}/status`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ status: 'active' }),
      });

      console.log('Approve response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Approve failed:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Approve result:', result);

      return result.data;
    } catch (error) {
      console.error('Error approving arena:', error);
      throw error;
    }
  },

  /**
   * Reject arena (change status from pending to disabled)
   * @param {string} id - Arena ID
   * @returns {Promise} API response
   */
  async rejectArena(id) {
    try {
      const token = localStorage.getItem('token');

      const headers = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      console.log('Rejecting arena:', id);

      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ARENAS}/${id}/status`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ status: 'disabled' }),
      });

      console.log('Reject response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Reject failed:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Reject result:', result);

      return result.data;
    } catch (error) {
      console.error('Error rejecting arena:', error);
      throw error;
    }
  },

  /**
   * Fetch owner's arenas with pagination and filters
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {string} params.name - Filter by name (optional)
   * @param {string} params.categoryId - Filter by category (optional)
   * @returns {Promise} API response
   */
  async getOwnerArenas(params = {}) {
    try {
      const queryParams = new URLSearchParams();

      // Add pagination parameters
      queryParams.append('page', params.page || 1);
      queryParams.append('limit', params.limit || 100);

      // Add optional filters
      if (params.name) queryParams.append('name', params.name);
      if (params.categoryId) queryParams.append('categoryId', params.categoryId);

      // Get token from localStorage
      const token = localStorage.getItem('token');

      const headers = {
        'Content-Type': 'application/json',
      };

      // Add Authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const url = `${API_BASE_URL}/arenas/owner?${queryParams.toString()}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();

      if (!result.isSuccess) {
        throw new Error(result.message || 'Failed to fetch owner arenas');
      }

      // Return the nested data structure with proper mapping
      return {
        data: result.data.data || [],
        total: result.data.total || 0,
        page: result.data.page || 1,
        limit: result.data.limit || 10,
        totalPages: result.data.totalPages || 0,
      };
    } catch (error) {
      console.error('Error fetching owner arenas:', error);
      throw error;
    }
  },
};
