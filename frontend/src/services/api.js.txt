// frontend/src/services/api.js
import axios from 'axios';

// Use localhost during development, replace with Render URL after deployment
const API_BASE_URL = 'http://localhost:3001';

export const generateMockCase = async (formType, formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/submit-form`, {
      formType,
      ...formData
    });
    return response.data;
  } catch (error) {
    // Redirect to USCIS if real data is detected
    if (error.response && error.response.status === 302) {
      window.location.href = 'https://www.uscis.gov/';
    }
    throw new Error('Failed to submit form. Please try again.');
  }
};