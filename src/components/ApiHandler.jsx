import axios from 'axios';

const API_KEY = '33842620-c45ae5552145e5cf17e045425';

const ApiHandler = async (searchTerm, pageNumber) => {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: searchTerm,
        per_page: 12,
        page: pageNumber,
      },
    });
    const results = response.data.hits;
    return results;
  } catch (error) {
    console.error(error);
  }
};

export default ApiHandler;
