import baseUrl from '../apis/config';
import { API_ENDPOINTS } from '../config/api';

export const userService = {
  /**
   * Fetch owner pending requests with pagination
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise} API response
   */
  async getOwnerRequests(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', params.page || 1);
      queryParams.append('limit', params.limit || 10);

      const response = await baseUrl.get(`${API_ENDPOINTS.USERS}/owner-requests?${queryParams.toString()}`);

      // Handle response structure
      if (response.data?.isSuccess && response.data?.data) {
        return {
          data: response.data.data.data || [],
          total: response.data.data.total || 0,
          page: response.data.data.page || 1,
          limit: response.data.data.limit || 10,
          totalPages: response.data.data.totalPages || 1,
        };
      }

      throw new Error('Invalid response structure');
    } catch (error) {
      console.error('Error fetching owner requests:', error);
      throw error;
    }
  },

  /**
   * Accept an owner request
   * @param {string} id - Owner request ID
   * @returns {Promise} API response
   */
  async acceptOwnerRequest(id) {
    try {
      const response = await baseUrl.patch(`${API_ENDPOINTS.USERS}/owner-requests/${id}/accept`);

      if (response.data?.isSuccess) {
        return response.data;
      }

      throw new Error(response.data?.message || 'Failed to accept owner request');
    } catch (error) {
      console.error('Error accepting owner request:', error);
      throw error;
    }
  },

  /**
   * Reject an owner request
   * @param {string} id - Owner request ID
   * @returns {Promise} API response
   */
  async rejectOwnerRequest(id) {
    try {
      const response = await baseUrl.patch(`${API_ENDPOINTS.USERS}/owner-requests/${id}/reject`);

      if (response.data?.isSuccess) {
        return response.data;
      }

      throw new Error(response.data?.message || 'Failed to reject owner request');
    } catch (error) {
      console.error('Error rejecting owner request:', error);
      throw error;
    }
  },
};
