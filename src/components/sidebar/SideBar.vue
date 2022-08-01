<script>
import SidebarLink from './SideBarLink.vue'
import { collapsed, toggleSidebar, sidebarWidth } from './state'
export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  }
}
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <div>V</div>
        <div>F</div>
      </span>
      <span v-else>Menu</span>
    </h1>

    <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink>
    <SidebarLink to="/login" icon="fa-solid fa-right-to-bracket" v-if="!this.$store.getters.isLoggedIn">Login</SidebarLink>
    <SidebarLink to="/clientes" icon="fas fa-users">Clientes</SidebarLink>
    <SidebarLink to="/precios" icon="fa-thin fa-dollar-sign">Lista Precios</SidebarLink>
    <SidebarLink to="/cotizador" icon="fa-solid fa-dollar-sign">Cotizador</SidebarLink>
    <SidebarLink to="/about" icon="fas fa-users">Acerca De</SidebarLink>

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
      
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #2f855a;
  --sidebar-item-hover: #cb7fbc;
  --sidebar-item-active: #0d623a;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}
.sidebar h1 {
  height: 2.5em;
}
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>