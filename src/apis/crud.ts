import axios from './axios';
import { Tasks, NewTask } from '../types/task';
const getAllDataApi = async (page: number, itemsPerPage: number):Promise<Tasks[]> => {
    return await axios.get(`/api/todos?page=${page}&itemsPerPage=${itemsPerPage}`)
}

const addTaskApi = async (name: string):Promise<Tasks[]> => {
    return await axios.post('/api/todos', {name})
}

const editTaskApi = async (id: string, newName: string, newStatus: string): Promise<any> => {
    return await axios.put(`/api/todos/${id}`, { newName, newStatus })
 }

const deleteTaskApi = async (id: string): Promise<any> => {
    return await axios.delete(`/api/todos/${id}`)
}

export {
    getAllDataApi,
    addTaskApi,
    deleteTaskApi,
    editTaskApi
}
