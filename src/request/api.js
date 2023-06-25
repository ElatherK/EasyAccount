import {get,post} from './http'
export function login(params) {
  return post('/api/login',params)
}
export function register(params) {
  return post('/api/register',params)
}
export function getAccountList() {
  return post('/api/getAccountList',{})
}
export function addAccount(params) {
  return post('/api/addAccounts',params)
}