import axios from 'axios'
//响应拦截器
// 响应拦截器
axios.interceptors.request.use(config => {
    if (sessionStorage.getItem('token')) {
        config.headers.Authorization = sessionStorage.getItem('token')
    }
    return config
})
//请求拦截器
export function get(url,params) {
    return new Promise((resolve,reject)=>{
        axios.get(url,params).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export function post(url,params) {
    return new Promise((resolve,reject)=>{
        axios.post(url,params).then(res => {
            resolve(res)
        })
    })
}