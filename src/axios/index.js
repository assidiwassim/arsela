import axios from 'axios';

let instance  = axios.create({
  baseURL: 'http://localhost:3001/api'
});
/*
instance.interceptors.request.use(config => {
  let token = "token" 
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}, function (error) {
  return Promise.reject(error);
});


instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {

      console.log('Message','Session expirée ! ')
      
    } else {
      return Promise.reject(error);
    }
});
*/
export default instance;