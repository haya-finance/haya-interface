import axios from 'axios';
import { getToken, isAuth } from './token';
// import { message } from 'antd';

const http = axios.create({
  timeout: 100000,
  baseURL: '/apis',
});

// ==============================|| axiosServices AXIOS - FOR MOCK SERVICES ||============================== //

http.interceptors.response.use(
  // (response) => response,
  // (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
  function (config) {
    if (isAuth()) {
      config.headers!.Authorization = `Bearer ${getToken().token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
);

// 相应拦截器
http.interceptors.response.use(undefined, error => {
  // 响应失败时，会执行此处的回调函数

  if (!error.response) {
    // console.log(error)
    // 网路超时
    return Promise.reject(error)
  }


  if (error.response.status === 401) {
    // token 过期，登录超时
    // Toast.show({
    //   content: '登录超时，请重新登录',
    //   duration: 1000,
    //   afterClose: () => {
    //     customHistory.push('/login', {
    //       from: customHistory.location.pathname
    //     })
    //   }
    // })
  }

  return Promise.reject(error)
})

export { http }
