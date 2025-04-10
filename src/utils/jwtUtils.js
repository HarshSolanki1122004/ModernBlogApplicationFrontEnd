export const getTokenExpiration = (token) => {
    if (!token) return null;
  
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    return payload.exp * 1000; 
  };
  