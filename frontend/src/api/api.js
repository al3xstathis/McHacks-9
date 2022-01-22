import axios from 'axios'
import {apiUrl} from "../constants";


const API = axios.create({
    baseURL: apiUrl
})


export default API
