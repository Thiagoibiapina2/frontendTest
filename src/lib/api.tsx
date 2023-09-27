import axios from 'axios'

 
export const api = axios.create({
 baseURL: "https://backend-test-posts.vercel.app",
})