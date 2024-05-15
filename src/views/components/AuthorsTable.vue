<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Empleados</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Nombre
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Telefono
              </th>

              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Status
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Pais
              </th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in users" :key="item.id_empleado">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img
                      src="../../assets/img/team-2.png"
                      class="avatar avatar-sm me-3"
                      alt="user1"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">
                      {{ item.nombres + " " + item.primer_apellido }}
                    </h6>
                    <p class="text-xs text-secondary mb-0">{{ item.email }}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ item.telefono }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <button
                  @click="statusChange(item.id_empleado)"
                  v-if="item.status === false"
                  class="btn-status badge badge-sm bg-gradient-danger"
                >
                  Offline
                </button>
                <button
                  @click="statusChange(item.id_empleado)"
                  v-if="item.status === true"
                  class="btn-status badge badge-sm bg-gradient-success"
                >
                  Online
                </button>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  item.pais
                }}</span>
              </td>
              <td class="align-middle">
                <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  >Edit</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const users = ref([]);
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/todo", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    users.value = response.data;
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
  }
});

const statusChange = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/statusempleado/${id}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    window.location.reload();
    return response.data;
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
  }
};
</script>

<style scoped>
.btn-status {
  border: none;
}
</style>
