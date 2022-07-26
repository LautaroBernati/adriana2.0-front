<template>
  <Login v-on:enviar-datos="loginWithCredentials"/>
</template>

<script>
import UsuariosService from "@/services/UsuariosService.js";
import LoggedUserFactory from '../helpers/LoggedUserFactory.js';
import Login from '../components/Login.vue';

export default {
    name: "LoginView",
    components:{
        Login,
    },
    data() {
        return {
            
            /*formUser: {
                dni: "",
                userPass: "",
            },*/
        };
    },
    methods: {
        async loginWithCredentials(formUser) {
            //this.ipAddress = UsuariosService.getApiUrl();
            try {
                if(!this.validarUsuario(formUser)) throw new Error("Usuario invalido");
                await UsuariosService.login(formUser)
                .then((data) => {
                    let loggedUser = LoggedUserFactory(data.data);
                    this.$store.dispatch('login', loggedUser);
                    this.$router.push({ name: "Home" });
                });
            } catch (err) {
                console.log(err.message);
                alert('Usuario incorrecto');
            }
        },
        validarUsuario(data){
            for(var key in data) {
                if(data[key] === "" || !data[key] || data[key] == null) {
                    console.log(key + " is blank.");
                    return false;
                }
            }
            return true;
        },
    },
};
</script>

<style>
#login {
  color:whitesmoke;
  padding:2%;
  background-color: #262222;
  border: double darkorchid;
  font-family: "Lato", sans-serif;
  margin-top: 1%;
  z-index: 10;
  width: 100%;;
}
#fondoLogin {
  background-color: #000;
  height: 650px;
}
#fotoFondoLogin {
  position: absolute;
  opacity: 0.5;
  object-fit: cover;
  height: 650px;
  width: 100%;
  z-index: 1;
}
</style>