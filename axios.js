const axios = require('axios');
const URL = 'http://localhost:4000';

const getAllTasks = async (page, limit) => {
    try {
        const response = await axios.get(`${URL}/tasks?page=${page}&limit=${limit}`);
        // if (response.data.status = 'BAD') { 
        //     return 
        // }
        return response.data.data;
      } catch (error) {
        console.error('Ошибка запроса:', error);
      }
}

const getTask = async (id) => {
    try {
        const response = await axios.get(`${URL}/tasks/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Ошибка запроса:', error);
      }
}

const postTask = async (tasksName) => {
    try {
        const response = await axios.post(`${URL}/tasks`, {
            tasksName,
            tasksIsCompleted: false,
        })
        return response.data.data;
    } catch (error) {
        console.log('Ошибка запроса', error);
    }
}

const updateTask =  async (id, body) => {
    try {
        const response = await axios.patch(`${URL}/tasks/${id}`, body);
        return response.data.data;
    } catch(error) {
        console.log('Ошибка запроса:', error);
    }
}

const deleteTask = async (id) => {
    try {
        const response = await axios.delete(`${URL}/tasks/${id}`);
        return response.data.data;
    } catch (error) {
        console.log('Ошибка запроса:', error);
    }
}
