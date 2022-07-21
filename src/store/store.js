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
            console.log('state: '+JSON.stringify(state.usuarioLogeado));
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
        islogin(state) {
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