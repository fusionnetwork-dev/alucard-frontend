// API Configuration
const API_URL = 'https://api.alucard.lol';

// Helper function to make API calls
async function apiCall(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    
    const defaultHeaders = {
        'Content-Type': 'application/json'
    };

    // Add auth token if exists
    const token = localStorage.getItem('alucard_token');
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers
        }
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Request failed');
        }
        
        return { success: true, data };
    } catch (error) {
        console.error('API Error:', error);
        return { success: false, error: error.message };
    }
}

// Export for use in other files
window.API_URL = API_URL;
window.apiCall = apiCall;
