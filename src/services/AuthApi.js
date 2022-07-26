import jwtDecode from "jwt-decode"
import {removeItem, getItem, addItem} from './LocalStorage'
import axios from "axios"


export default function hasAuthenticated() {
  const token = getItem('miniblogToken')
  const result = token ? isValidToken(token) : false

  if (false === result) {
    removeItem('miniblogToken') 
  }

  return result
}

/*-- Function Login --*/
export async function login(credentials) { 

  return axios
    .post("https://api.genuka.com/2021-10/clients/login", credentials)
    .then(response => response.data.access_token)
    .then(token => {
      addItem('miniblogToken', token)
      return true
    })
}

/*-- Function Register --*/
export async function registed(credentials) {

  return axios
  .post("https://api.genuka.com/2021-10/clients/register", credentials)
    .then(response => response.data.access_token)
}

/*-- Function Logout --*/
export function logout() {
  removeItem('miniblogToken')
}

/*-- Function isValidToken --*/
function isValidToken(token) {
  const {exp} = jwtDecode(token)
  if (exp * 1000 > new Date().getItem()) {
    return true
  }

  return false
}