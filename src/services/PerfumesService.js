import axios from 'axios';
import utils from '../helpers/utils';
import Service from './Service.js';

class PerfumesService extends Service {
    constructor(token){
        super(token);
        this.API_URL = utils.API_URL;
        this.apiClient = axios.create({
            baseURL: this.API_URL,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        });
    }

    async getPerfumeByIDPerfume(idPerfume) {
        return await this.apiClient.get('/perfumes=?'+idPerfume);
      }
    async getAllPerfumes() {
        return await this.apiClient.get('/perfumes');
    }
    async createPerfume(perfume) {
        return await this.apiClient.post('/perfumes', {perfume});
    }
    async borrarPerfume(idPerfume) {
        return await this.apiClient.delete('/perfumes/' + idPerfume);
    }
    async editarPerfume(perfume) {
        return await this.apiClient.put('/perfumes', {perfume});
    }
}

export default PerfumesService;