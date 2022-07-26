<script setup>
import TheWelcome from '@/components/TheWelcome.vue'
</script>

<template>
  <div class="home" id="home">
    <header id="headerFondo">
      <img src="/vf-profilepic.jpg" alt="logo" id="vf-logo">
    </header>
    <img src="/favicon.ico" id="logo">

    <div class="cajita">
      <p id="textoFondo" class="">
        Bienvenido al Sistema Adriana 2.0
        <br>
        <router-link to="/login" class="">Inicia sesion</router-link> para poder operar
      </p>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style>

#home{
  height: 1px;
  padding: 0%;
  
}
#logo{
  position:absolute;
  top:10%;
  left:2%;
  z-index: 1;
}
#headerFondo{
  background-color:#000000 !important;
}
#fondo{
  opacity: 0.5;
  object-fit: scale-down;
  
  width: 10%;
}
@media(max-width: 700px){
  #fondo{
    height:400px
  }
}
#textoFondo{
  position: absolute;
  top: 50%;
  left:40%;
  font-size: 1.5em;
  color:darkviolet;
  z-index: 100;
  background-color: grey;
  padding: 15px;
  border: 4px solid gold;
  border-radius: 10px;
}
#vf-logo{
  z-index:1;
}
</style>