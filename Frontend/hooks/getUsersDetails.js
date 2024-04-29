import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

export const getUserBySearch = async (query) => {
    const response = await fetch(`${BASE_URL}/search/user/${query}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
  
    const users = await response.json();
    return users;
  };

