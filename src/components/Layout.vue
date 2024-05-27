<template>
  <div>
    <div class="menu-movil">
      <MenuMovil />
    </div>
    <router-view />
  </div>
</template>

<script>
import MenuMovil from "../components/MenuVersionMovil.vue";

export default {
  components: {
    MenuMovil,
  },
};
</script>

<style scoped>
@media screen and (min-width: 1200px) {
  .menu-movil {
    display: none;
  }
}
</style>
