import axios from "axios";

const Instance =axios.create({
    baseURL: "http://localhost:3000",
})

Instance.interceptors.request.use(
    (confiq) => {
      const token = localStorage.getItem("token");
      if (token) {
        confiq.headers.Authorization = `Bearer ${token}`;
      }
      return confiq;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

export default Instance