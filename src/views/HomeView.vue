<script setup>
import TheWelcome from '@/components/TheWelcome.vue'
</script>

<template>
  <div class="home" id="home">
    <header id="headerFondo">
      <img src="/chanelicon.png" id="fondo">
    </header>
    <img src="/favicon.ico" id="logo">
    <p class="textoFondo text-light">
      Bienvenido al Sistema Adriana 2.0
      <br>
      <router-link to="/register" class="text-light">Registrate</router-link> para poder calificar y comentar sobre tus experiencias en distintos restaurantes que se encuentran en nuestros listados.
      Accede a los distintos links desde arriba.
    </p>
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
  object-fit: cover;
  height: 650px;
  width: 100%;
}
@media(max-width: 700px){
  #fondo{
    height:400px
  }
}
.textoFondo{
  position: absolute;
  top: 50%;
  text-align: left;
  left:2%; 
  font-size: 1.5em
}
</style>