import axios from "axios"

const apiClient = axios.create({
    baseURL: 'http://localhost:2656/twitch/v1',
    timeout: 5000
})

export const registerRequest = async(data) => {
    try {
        return await apiClient.post('/auth/register', data)
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}

export const loginRequest = async(data) => {
    try {
        return await apiClient.post('/auth/login', data)
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}