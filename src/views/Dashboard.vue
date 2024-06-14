<script setup>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import Calendar from "../examples/Calendar.vue";
import CategoriesList from "./components/CategoriesList.vue";
import { ref, onMounted } from "vue";
import api from "/src/boot/axios";
import US from "@/assets/img/icons/flags/US.png";
import DE from "@/assets/img/icons/flags/DE.png";
import GB from "@/assets/img/icons/flags/GB.png";
import BR from "@/assets/img/icons/flags/BR.png";

const sales = {
  us: {
    country: "United States",
    sales: 2500,
    value: "$230,900",
    bounce: "29.9%",
    flag: US,
  },
  germany: {
    country: "Germany",
    sales: "3.900",
    value: "$440,000",
    bounce: "40.22%",
    flag: DE,
  },
  britain: {
    country: "Great Britain",
    sales: "1.400",
    value: "$190,700",
    bounce: "23.44%",
    flag: GB,
  },
  brasil: {
    country: "Brasil",
    sales: "562",
    value: "$143,960",
    bounce: "32.14%",
    flag: BR,
  },
};

const countUsers = ref([]);

onMounted(async () => {
  try {
    const response = await api.get("/todo", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    countUsers.value = response.data.length;
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
  }
});

const countTareas = ref([]);
const countTareasAbiertas = ref([]);
const countTareasCerradas = ref([]);
const countTareasUrgentes = ref([]);
const countTareasImportantes = ref([]);

onMounted(async () => {
  try {
    const response = await api.get("/tarea", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    countTareas.value = response.data.length;
    countTareasAbiertas.value = response.data.filter(
      (e) => e.status === true
    ).length;

    countTareasCerradas.value = response.data.filter(
      (e) => e.status === false
    ).length;
    countTareasUrgentes.value = response.data.filter(
      (e) => e.prioridad == "Urgent"
    ).length;
    countTareasImportantes.value = response.data.filter(
      (e) => e.prioridad == "Important"
    ).length;
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
  }
});
</script>
<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Total employees"
              :value="countUsers"
              :icon="{
                component: 'ni ni-world',
                background: 'bg-gradient-danger',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Total tasks"
              :value="countTareas"
              :icon="{
                component: 'ni ni-paper-diploma',
                background: 'bg-gradient-success',
                shape: 'rounded-circle',
              }"
            />
          </div>
        </div>
        <Calendar />

        <div class="row mt-4">
          <div class="col-lg-7 mb-lg-0 mb-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-2">Sales by Country</h6>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-items-center">
                  <tbody>
                    <tr v-for="(sale, index) in sales" :key="index">
                      <td class="w-30">
                        <div class="px-2 py-1 d-flex align-items-center">
                          <div>
                            <img :src="sale.flag" alt="Country flag" />
                          </div>
                          <div class="ms-4">
                            <p class="mb-0 text-xs font-weight-bold">
                              Country:
                            </p>
                            <h6 class="mb-0 text-sm">{{ sale.country }}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Sales:</p>
                          <h6 class="mb-0 text-sm">{{ sale.sales }}</h6>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Value:</p>
                          <h6 class="mb-0 text-sm">{{ sale.value }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">Bounce:</p>
                          <h6 class="mb-0 text-sm">{{ sale.bounce }}</h6>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <categories-list
              :categories="[
                {
                  icon: {
                    component: 'ni ni-mobile-button',
                    background: 'dark',
                  },
                  label: 'Task completed',
                  description: `<strong>${countTareasAbiertas} closed</strong>`,
                },
                {
                  icon: { component: 'ni ni-box-2', background: 'dark' },
                  label: 'Task pending',
                  description: `<strong>${countTareasCerradas} open</strong>`,
                },
                {
                  icon: {
                    component: 'ni ni-tag',
                    background: 'dark',
                  },
                  label: 'Urgent tasks',
                  description: `  <strong>${countTareasUrgentes} urgent tasks priority</strong>`,
                },
                {
                  icon: { component: 'ni ni-satisfied', background: 'dark' },
                  label: 'Important task',
                  description: `<strong>${countTareasImportantes} important tasks priority<strong>`,
                },
              ]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
