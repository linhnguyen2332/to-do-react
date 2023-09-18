import axios from './axios';

export const handleLoginApi = async(email: string, password: string): Promise<any> => { 
    return await axios.post('/api/user/login', {email, password})
}

