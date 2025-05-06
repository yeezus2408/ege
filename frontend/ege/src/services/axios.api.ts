import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/cookiesHelper.ts'

export const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        Authorization: `Bearer ` + getTokenFromLocalStorage() || '',

    }
})