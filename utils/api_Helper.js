/**
 * Creates a base API request context with common headers and authentication
 */
function createApiContext(request, authToken) {
  return {
    get: async (url, options = {}) => {
      const headers = {
        ...(options.headers || {}),
        ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
      };
      
      return request.get(url, { ...options, headers });
    },
    
    post: async (url, options = {}) => {
      const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
        ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
      };
      
      return request.post(url, {
        ...options, 
        headers
      });
    }
  };
}

module.exports = {
  createApiContext
};