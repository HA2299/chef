import axios from '../services/axios'

// Sets the authorization token in local storage and axios headers
export const setSession = (token: string) => {
    localStorage.setItem('token', token)
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

// Retrieves the authorization token from local storage
export const getSession = () => {
    const token = localStorage.getItem('token')
    return token
}

// Removes the authorization token from local storage
export const removeSession = () => {
    localStorage.removeItem('token')
}
