<template>
  <div>
    <MenuMovil />
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
