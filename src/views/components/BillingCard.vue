<template>
  <div class="card">
    <div class="card-header pb-0 px-3">
      <h6 class="mb-0">Tareas asginadas</h6>
    </div>
    <div class="card-body pt-4 p-3">
      <ul class="list-group">
        <li
          v-for="(item, index) in tareas"
          :key="index"
          class="list-group-item border-0 p-4 mb-2 bg-gray-100 border-radius-lg"
        >
          <div class="d-flex flex-column text-justify">
            <div style="column-gap: 2px" class="d-flex div-badge">
              <span class="btn-status badge badge-sm bg-gradient-warning mb-2">
                {{ item.prioridad }}
              </span>
              <br />
              <button
                v-if="item.status === false"
                class="btn-status badge badge-sm bg-gradient-danger mb-2"
                @click="statusChange(item.id_tarea)"
              >
                Pendiente
              </button>
              <button
                v-if="item.status === true"
                class="btn-status badge badge-sm bg-gradient-success mb-2"
                @click="statusChange(item.id_tarea)"
              >
                Tarea finalizada
              </button>
            </div>
            <h6 class="mb-3 text-sm">{{ item.nombre }}</h6>
            <span class="mb-2 text-xs">
              Fecha asignacion:
              <span class="text-dark font-weight-bold ms-sm-2">{{
                moment(item.fecha_asignacion_task).format("YYYY-MM-DD")
              }}</span>
            </span>
            <span class="mb-2 text-xs">
              Fecha finalizacion:
              <span class="text-dark ms-sm-2 font-weight-bold">{{
                moment(item.fecha_finalizacion_task).format("YYYY-MM-DD")
              }}</span>
            </span>

            <span class="text-xs">
              Descripcion:
              <span class="text-dark ms-sm-2 font-weight-bold">{{
                item.descripcion
              }}</span>
            </span>
            <div class="btn-delete">
              <button
                class="btn btn-link text-danger text-dark px-3 mb-0"
                href="javascript:;"
              >
                <i
                  class="fas fa-pencil-alt text-dark me-2"
                  aria-hidden="true"
                ></i
                >Edit
              </button>
              <button
                @click="deleteTask(item.id_tarea)"
                class="btn btn-link text-danger text-gradient px-3 mb-0"
                href="javascript:;"
              >
                <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "/src/boot/axios";
import moment from "moment";

const tareas = ref([]);

onMounted(async () => {
  try {
    const response = await api.get("/tarea", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    tareas.value = response.data;
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
  }
});

const statusChange = async (id) => {
  try {
    const response = await api.get(`/statutask/${id}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    window.location.reload();
    return response.data;
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
  }
};

const deleteTask = async (id) => {
  try {
    const response = await api.delete(`/deletetarea/${id}`);
    console.log(response.data);
    window.location.reload();
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
  }
};
</script>

<style scoped>
.btn-delete {
  display: flex;
  justify-content: space-evenly;
}
.div-badge {
  justify-content: flex-end;
  width: 100%;
}
.btn-status {
  border: none;
}
</style>
