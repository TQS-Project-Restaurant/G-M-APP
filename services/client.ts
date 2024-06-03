import { useUserStore } from "@/stores/useUserStore";
import axios from "axios";

const Client = axios.create({
    baseURL: "http://deti-tqs-01.ua.pt/api",
    timeout: 5000,
  });

Client.interceptors.request.use(
  (config) => {
    if(useUserStore.getState().logged){
      config.headers.Authorization = `Bearer ${useUserStore.getState().token}`;
    }
    return config
  },
  (error) =>{
    return Promise.reject(new Error(error));
  }
)

Client.interceptors.response.use(
    function (response){
      return response; 
  
    }, 
    function(error){
      const logout = useUserStore.getState().logout
  
      if (error.response.status === 403){
        logout()
      }
  
      return Promise.reject(new Error(error));
    }
  )

export default Client;
  