import axios from "axios";
import config from "../config";

const http = axios.create({
  // baseURL: config.API_URL
});
// http.interceptors.request.use(
//   async req => {
//     const originalRequest = req;
//     const TOKEN = await AsyncStorage.getItem('TOKEN');
//     // console.log('_________________');
//     // console.log(TOKEN);
//     // console.log('_________________');
//     originalRequest.headers.Authorization = `Bearer ${TOKEN}`;
//     console.log(originalRequest);
//     return originalRequest; //Promise.resolve(originalRequest);
//   },
//   err => Promise.reject(err)
// );
// http.interceptors.response.use(
//   response =>
//     // Do something with response data
//     response,
//   error => {
//     console.log(error);
//     // Do something with response error
//     console.log(error.response);
//     Toast.show({
//       text: error.response.data.error,
//       type: 'danger'
//     });
//     return Promise.reject(error.response.data.error);
//   }
// );
export default http;
