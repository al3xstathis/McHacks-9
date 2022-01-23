import axios from 'axios'
import {apiUrl, local} from "../constants";


const API = axios.create({
    baseURL: apiUrl
})


export default API
