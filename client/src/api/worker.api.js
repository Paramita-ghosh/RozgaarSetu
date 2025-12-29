import axios from './axios'; // Using your modified axios instance

/**
 * Register a new worker profile
 * @param {FormData} formData - Includes skills, bio, price, and idCard file
 */
export const registerWorker = async (formData) => {
  return await axios.post('/workers/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

/**
 * Fetch a specific worker's profile by User ID
 */
export const fetchWorkerProfile = async (userId) => {
  return await axios.get(`/workers/${userId}`);
};

/**
 * HYPERLOCAL SEARCH: Fetch workers within a specific radius
 * @param {number} lng - Longitude
 * @param {number} lat - Latitude
 * @param {number} radius - Distance in meters (default 5000)
 */
export const getNearbyWorkers = async (lng, lat, radius = 5000) => {
  return await axios.get(`/workers/nearby?lng=${lng}&lat=${lat}&radius=${radius}`);
};