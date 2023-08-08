import axios from 'axios';

const TASK_API_BASE_URL = "http://localhost:1337/api/v1/tasks";

class TaskService {

    getTasks(params){
        return axios.get(TASK_API_BASE_URL, { params });
    }

    createTask(task){
        return axios.post(TASK_API_BASE_URL, task);
    }

    getTaskById(taskId){
        return axios.get(TASK_API_BASE_URL + '/' + taskId);
    }

    updateTask(task, taskId){
        return axios.put(TASK_API_BASE_URL + '/' + taskId, task);
    }

    deleteTask(taskId){
        return axios.delete(TASK_API_BASE_URL + '/' + taskId);
    }
}

export default new TaskService()