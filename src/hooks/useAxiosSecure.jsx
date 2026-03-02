import axios from "axios";
import { auth } from "../firebase/firebase.config";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

// Add interceptor once - uses Firebase currentUser for fresh token
instance.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    if (user) {
        const token = await user.getIdToken();
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
});

const useAxiosSecure = () => {
    return instance;
};

export default useAxiosSecure;