export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null; // Or handle it as needed for server-side
};


export const getUser = () => {
  if (typeof window !== 'undefined') {
    const user =  localStorage.getItem('user');
    return JSON.parse(user || "")
  }
  return null; // Or handle it as needed for server-side
};