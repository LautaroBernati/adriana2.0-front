<template>
  <div>
    <section id="fondoLogin">
      <!--<img src="../../public/img/fondoLogin.jpg" id="fotoFondoLogin" />-->
      <div class="row g-0">
        <div class="col-4"></div>
        <div id="login" class="col-4 rounded">
          <h2><b>Ingresar</b></h2>
          <form @submit.prevent="loginWithCredentials">
            <input
              type="dni"
              v-model="usuario.dni"
              placeholder="DNI del Usuario"
              class="form-control input-lg"
            />
            <br />
            <input
              type="password"
              v-model="usuario.userPass"
              placeholder="Contraseña"
              class="form-control input-lg"
            />
            <br />
            <div class="d-grid">
              <button type="submit" class="btn btn-dark btn-block mb-3">
                Ingresar
              </button>
            </div>
          </form>
        </div>
        <div class="col-4"></div>
      </div>
    </section>
  </div>
</template>

<script>
import UsuariosService from "@/services/UsuariosService.js";
import { mapActions } from "vuex";
import LoggedUserFactory from '../helpers/LoggedUserFactory.js';

export default {
    name: "Login",
    data() {
        
        return {
            usuario: {
                dni: "",
                userPass: "",
            },
        };
    },
    methods: {
        async loginWithCredentials() {
            try {
                await UsuariosService.login(this.usuario)
                .then((data) => {
                    let loggedUser = LoggedUserFactory(data.data);
                    this.$store.dispatch('login', loggedUser);
                    //console.log(this.$store.dispatch);
                    console.log('token desde getter ' + this.$store.getters.getToken);
                    //this.$router.push({ name: "Home" });
                });
            } catch (err) {
                console.log(err.message);
                alert("Usuario incorrecto");
                this.usuario.dni = "";
                this.usuario.userPass = "";
            }
        },
    },
};
</script>

<style>
#login {
  background-color: #ffffff;
  border: double;
  font-family: "Lato", sans-serif;
  margin-top: 7%;
  z-index: 10;
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