const axios = require('axios');

const getAllTasks = async () => {
    try {
        const response = await axios.get('https://example.com/api/data');
        return response.data;
      } catch (error) {
        console.error('Ошибка запроса:', error);
      }
}