import axios from 'axios';
import utils from '../helpers/utils';
import Service from './Service.js';

class ClientesService extends Service {
    constructor(token){
        super(token);
        this.API_URL = utils.API_URL;
        this.apiClient = axios.create({
            baseURL: this.API_URL,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
        });
    }

    async getClienteByDni(dni) {
        return await this.apiClient.get('/clientes=?'+dni, {headers: {Authorization: `Bearer ${this.token}`}});
      }
    async getAllClientes() {
        return await this.apiClient.get('/clientes',  {headers: {Authorization: `Bearer ${this.token}`}});
    }
    async createCliente(cliente) {
        return await this.apiClient.post('/clientes', {cliente} ,  {headers: {Authorization: `Bearer ${this.token}`}});
    }
    async borrarCliente(alias){
        return await this.apiClient.delete('/clientes/' + alias,  {headers: {Authorization: `Bearer ${this.token}`}} );
    }
    async editarCliente(cliente) {
        return await this.apiClient.put('/clientes', {cliente},  {headers: {Authorization: `Bearer ${this.token}`}});
    }
}

export default ClientesService;