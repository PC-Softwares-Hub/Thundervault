// Real-time Cloud Database Integration for instant multi-user syncing
// Uses free cloud JSON storage API so admin uploads sync instantly to all visitors worldwide!

const CLOUD_BIN_ID = '67a63442e41b4d34e4881000'; // Public Cloud Bin ID
const API_KEY = '$2a$10$nJ.gG3W6nJ3kQ5vY/9L1s.vN5u9oW0q0n7a8b9c0d1e2f3g4h5i6j'; // Public Master Key

const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${CLOUD_BIN_ID}`;

// Fetch live products from Cloud DB
export const fetchCloudProducts = async () => {
  try {
    const response = await fetch(JSONBIN_URL + '/latest', {
      method: 'GET',
      headers: {
        'X-Master-Key': '$2a$10$7Z/YvGz4v.a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v'
      }
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.record || null;
  } catch (error) {
    console.warn('Cloud DB fetch fallback to initialProducts:', error);
    return null;
  }
};

// Save updated products to Cloud DB (Admin Only)
export const saveCloudProducts = async (productsArray) => {
  try {
    const response = await fetch(JSONBIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$7Z/YvGz4v.a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v'
      },
      body: JSON.stringify(productsArray)
    });
    return response.ok;
  } catch (error) {
    console.error('Cloud DB save failed:', error);
    return false;
  }
};
