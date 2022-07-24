import axios from 'axios';
import store from '../store/store';
import utils from '../helpers/utils';

const API_URL = utils.API_URL;
let userToken = store.getters.getToken;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})

export default {
  getClienteByDni(dni) {
    return apiClient.get('/clientes=?'+dni, {headers: {Authorization: `Bearer ${userToken}`}})
  },
  getAllClientes(id) {
    return apiClient.get('/clientes',  {headers: {Authorization: `Bearer ${userToken}`}}) 
  },
  createCliente(cliente) {
    return apiClient.post('/clientes', {cliente} ,  {headers: {Authorization: `Bearer ${userToken}`}})
  },
  borrarCliente(dni){
    return apiClient.delete('/clientes/' + dni,  {headers: {Authorization: `Bearer ${userToken}`}} )
  },
  editarCliente(cliente) {
    return apiClient.put('/clientes/', {cliente},  {headers: {Authorization: `Bearer ${userToken}`}})
  }, 

}