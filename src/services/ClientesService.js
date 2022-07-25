import axios from 'axios';
import store from '../store/store';
import utils from '../helpers/utils';

class ClientesService {
    constructor(token){
        this.API_URL = utils.API_URL;
        this.apiClient = axios.create({
            baseURL: this.API_URL,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
        });
        this.token = token;
    }

    getClienteByDni(dni) {
        return this.apiClient.get('/clientes=?'+dni, {headers: {Authorization: `Bearer ${this.token}`}});
      }
    async getAllClientes() {
        console.log('token: '+ this.token);
        return this.apiClient.get('/clientes',  {headers: {Authorization: `Bearer ${this.token}`}});
    }
    createCliente(cliente) {
        return this.apiClient.post('/clientes', {cliente} ,  {headers: {Authorization: `Bearer ${this.token}`}});
    }
    borrarCliente(dni){
        return this.apiClient.delete('/clientes/' + dni,  {headers: {Authorization: `Bearer ${this.token}`}} );
    }
    editarCliente(cliente) {
        return this.apiClient.put('/clientes/', {cliente},  {headers: {Authorization: `Bearer ${this.token}`}});
    }
}

export default ClientesService;