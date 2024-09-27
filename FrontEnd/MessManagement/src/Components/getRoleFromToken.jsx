import jwt from 'jsonwebtoken';

export function getRoleFromToken() {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.decode(token);

    if (decoded && decoded.role) {
      return decoded.role;
    }
    
    return null; // No role found in the token
  } catch (error) {
    console.error('Error decoding token:', error);
    return null; // Return null in case of an error
  }
}