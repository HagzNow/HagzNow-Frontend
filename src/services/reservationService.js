import { API_BASE_URL } from '../config/api';

export const reservationService = {
  /**
   * Fetch upcoming (future) reservations with pagination
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise} API response
   */
  async getCurrentReservations(params = {}) {
    try {
      const queryParams = new URLSearchParams();

      // Add pagination parameters
      queryParams.append('page', params.page || 1);
      queryParams.append('limit', params.limit || 12);

      // Add filter parameters if provided and not empty
      if (params.arenaName && params.arenaName.trim()) {
        queryParams.append('arenaName', params.arenaName.trim());
      }
      if (params.status && params.status.trim()) {
        queryParams.append('status', params.status.trim());
      }

      console.log('getCurrentReservations query params:', queryParams.toString());

      // Get token from localStorage
      const token = localStorage.getItem('token');

      const headers = {
        'Content-Type': 'application/json',
      };

      // Add Authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/reservations/upcoming?${queryParams.toString()}`, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.isSuccess) {
        throw new Error(result.message || 'Failed to fetch upcoming reservations');
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
      console.error('Error fetching upcoming reservations:', error);
      throw error;
    }
  },
  /**
   * Fetch past reservations with pagination
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise} API response
   */
  async getPastReservations(params = {}) {
    try {
      const queryParams = new URLSearchParams();

      // Add pagination parameters
      queryParams.append('page', params.page || 1);
      queryParams.append('limit', params.limit || 12);

      // Add filter parameters if provided and not empty
      if (params.arenaName && params.arenaName.trim()) {
        queryParams.append('arenaName', params.arenaName.trim());
      }
      if (params.status && params.status.trim()) {
        queryParams.append('status', params.status.trim());
      }

      console.log('getPastReservations query params:', queryParams.toString());

      // Get token from localStorage
      const token = localStorage.getItem('token');

      const headers = {
        'Content-Type': 'application/json',
      };

      // Add Authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/reservations/past?${queryParams.toString()}`, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.isSuccess) {
        throw new Error(result.message || 'Failed to fetch past reservations');
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
      console.error('Error fetching past reservations:', error);
      throw error;
    }
  },

  /**
   * Fetch owner reservations for a specific arena and date range.
   * @param {Object} params
   * @param {string} params.arenaId - Required arena id
   * @param {string} params.startDate - ISO date (YYYY-MM-DD)
   * @param {string} params.endDate - ISO date (YYYY-MM-DD)
   */
  async getOwnerReservations(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.arenaId) queryParams.append('arenaId', params.arenaId);
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);

      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${API_BASE_URL}/reservations?${queryParams.toString()}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (!result.isSuccess) {
        throw new Error(result.message || 'Failed to fetch reservations');
      }

      return result.data || [];
    } catch (error) {
      console.error('Error fetching owner reservations:', error);
      throw error;
    }
  },

  /**
   * Fetch reservation details by id (owner/admin protected).
   * @param {string} id - reservation id
   */
  async getReservationById(id) {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (!result.isSuccess) {
        throw new Error(result.message || 'Failed to fetch reservation');
      }

      return result.data;
    } catch (error) {
      console.error('Error fetching reservation details:', error);
      throw error;
    }
  },

  /**
   * Create a manual reservation by owner
   * @param {Object} payload
   * @param {string} payload.arenaId
   * @param {string} payload.date - YYYY-MM-DD
   * @param {number[]} payload.slots - array of hours
   * @param {string[]} payload.extras - optional extras ids
   */
  async createOwnerManualReservation(payload) {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${API_BASE_URL}/reservations/owner/manual`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || `HTTP error ${response.status}`);
      }

      const result = await response.json();
      if (!result.isSuccess) {
        throw new Error(result.message || 'Failed to create manual reservation');
      }

      return result.data;
    } catch (error) {
      console.error('Error creating manual reservation:', error);
      throw error;
    }
  },
};
