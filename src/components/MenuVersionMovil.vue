<template>
  <div class="bottom-nav">
    <div
      class="nav-item"
      v-for="(item, index) in navItems"
      :key="item.name"
      @click="selectItem(item.route)"
      :class="{ active: selectedIndex === index }"
    >
      <i :class="item.icon"></i>
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const navItems = [
  { name: "Employees", icon: "fas fa-user", route: "/empleados" },
  { name: "Tasks", icon: "fas fa-tasks", route: "/tareas" },
  { name: "Home", icon: "fas fa-home", route: "/dashboard" },
  { name: "Register", icon: "fas fa-user-plus", route: "/registrar" },
  { name: "Settings", icon: "fas fa-cog", route: "/settings" },
];

const selectedIndex = ref(2); // Central item as default

const selectItem = (route) => {
  const index = navItems.findIndex((item) => item.route === route);
  selectedIndex.value = index;
  router.push(route);
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  z-index: 1000;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.nav-item {
  flex: 1;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    color 0.3s ease;
}

.nav-item i {
  font-size: 24px;
  color: #777;
  transition:
    color 0.3s ease,
    transform 0.3s ease;
}

.nav-item span {
  display: block;
  font-size: 12px;
  color: #777;
  transition: color 0.3s ease;
}

.nav-item.active i,
.nav-item.active span {
  color: #007bff;
}

.nav-item:hover i,
.nav-item:hover span {
  color: #007bff;
}
</style>
