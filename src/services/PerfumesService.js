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
    async getPerfumesPaginated(pagination, filter = null) {
        var query = "/perfumes?";
        query += "&pageSize=" + pagination.pageSize;
        query += "&page=" + pagination.page;
        if (filter != null) {
            query += "&creator="+filter.creator;
            query += "&fragrance="+filter.fragrance;
            query += "&gender="+filter.gender;
        }
        console.log(query)
        
        return await this.apiClient.get(query);
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