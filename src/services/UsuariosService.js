import axios from 'axios';
import store from '../store/store';

//let userToken = store.default.getters.getToken;
let userToken = store.getters.getToken;
/*try{
  userToken = JSON.parse(localStorage.loggedUser);
  userToken = userToken.token;
}catch(e){
  userToken = "";
}*/

const apiClient = axios.create({
  baseURL: 'http://localhost:3005', 
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});

export default {
  login(usuario) {
    return apiClient.post('/auth/login', usuario);
  },
  getUsuarioId(id) {
    return apiClient.get('/usuarios/' + id, {headers: {Authorization: `Bearer ${userToken}`}});
  },
  getUsuario() {
    return apiClient.get('/usuarios', {headers: {Authorization: `Bearer ${userToken}`}});
  },
  postUsuario(usuario) {
    //let token = tokenService.createToken(usuario)
    return apiClient.post('/usuarios', {token})
  },
  deleteUsuario(usuario) {
    //let token = tokenService.createToken(usuario)
    return apiClient.delete('/usuarios/' + dni, {headers: {Authorization: `Bearer ${userToken}`}});
  },
  putUsuario(usuario) {
    //let token = tokenService.createToken(usuario)
    return apiClient.put('/usuarios', {token}, {headers: {Authorization: `Bearer ${store.default.getters.getToken}`}})
  },
}
