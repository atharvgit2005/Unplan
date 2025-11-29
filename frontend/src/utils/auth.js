export const setToken = (token) => {
    localStorage.setItem("authToken", token);
  };
  
  export const getToken = () => {
    return localStorage.getItem("authToken");
  };
  
  export const removeToken = () => {
    localStorage.removeItem("authToken");
  };
  
  export const getUserFromToken = () => {
    const token = getToken();
    if (!token) return null;
  
    try {
      const parts = token.split(".");
      if (parts.length !== 3) return null;
  
      const payload = JSON.parse(atob(parts[1]));
      
      return {
        userId: payload.userId,
        email: payload.email,
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  
  export const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;
  
    try {
      const parts = token.split(".");
      if (parts.length !== 3) return false;
      const payload = JSON.parse(atob(parts[1]));
      if (payload.exp * 1000 < Date.now()) {
        removeToken();
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false;
    }
  };
  