import { createStore } from 'vuex';

const store = createStore({
    state: {
        tokenUsuario: null,  
        usuarioLogeado: null
    },
    mutations: {
        SET_USER_DATA(state, usuario) {
            localStorage.setItem('usuario', usuario);
            state.usuarioLogeado = usuario;
            state.tokenUsuario = usuario.token;
        },
        CLEAR_USER_DATA(state) {
            localStorage.removeItem('usuario');
            state.tokenUsuario = null;
            state.usuarioLogeado = null;
        },
    },
    actions:{
        login(context, usuario){
            if(!!usuario){
                context.commit('SET_USER_DATA', usuario);
            } else {
                throw new Error('Error al iniciar sesion');
            }
        },
        logout({ commit }) {
            commit('CLEAR_USER_DATA')
        },
    },
    getters: {
        isAdmin(state){
            if(!state.usuarioLogeado) return false;
            if(state.usuarioLogeado.type == 'administrator'){
                return true;
            } else {
                return false;
            }
        },
        isLoggedIn(state) {
            return !!state.tokenUsuario
        },
        getUsuario(state) {
            return state.usuarioLogeado
        },
        getToken(state) {
            return state.tokenUsuario
        }
    }
})

export default store