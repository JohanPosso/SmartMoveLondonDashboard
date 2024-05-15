<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#createTask"
  >
    Crear Tarea
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="createTask"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Crear nueva tarea
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- //// -->
          <form>
            <div class="input-group mb-3">
              <span class="input-group-text" id="nombre">📝 Tarea</span>
              <input
                v-model="nombre"
                type="text"
                class="form-control"
                placeholder="Nombre de tarea"
                aria-label="Username"
                aria-describedby="basic-addon1"
                id="nombre"
                name="nombre"
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" for="id_empleado"
                >👤 Empleado</span
              >
              <select
                v-model="id_empleado"
                class="form-select"
                id="id_empleado"
              >
                <option
                  :value="item.id_empleado"
                  v-for="(item, index) in users"
                  :key="index"
                >
                  {{ item.nombres }}
                </option>
              </select>
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="fecha_entraga">📅</span>
              <input
                type="date"
                class="form-control"
                placeholder="Fecha entrega"
                aria-label="fecha entrega"
                aria-describedby="basic-addon1"
                id="fecha_entraga"
                name="fecha_entraga"
                v-model="fecha_entraga"
              />
            </div>

            <hr />

            <h5 class="text-center">Prioridad</h5>
            <div class="flex-item d-flex justify-content-around mb-3">
              <div class="form-check form-switch">
                <input
                  v-model="urgente"
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="urgente"
                />
                <label class="form-check-label" for="urgente">Urgente</label>
              </div>

              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="importante"
                  v-model="importante"
                />
                <label class="form-check-label" for="importante"
                  >Importante</label
                >
              </div>

              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="normal"
                  v-model="normal"
                />
                <label class="form-check-label" for="normal">No tanto</label>
              </div>
            </div>

            <hr />

            <div class="form-floating mb-3">
              <textarea
                class="form-control"
                placeholder="Leave a comment here"
                id="descripcion"
                style="height: 100px"
                v-model="descripcion"
              ></textarea>
              <label for="descripcion">Comments</label>
            </div>
          </form>
          <!-- //// -->
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            @click.prevent="submitForm"
            type="button"
            class="btn btn-primary"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const nombre = ref("");
const fecha_entraga = ref("");
const id_empleado = ref("");
const urgente = ref("");
const importante = ref("");
const normal = ref("");
const descripcion = ref("");
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

const prioridad = () => {
  if (urgente.value === true) return (urgente.value = "Urgente");
  if (importante.value === true) return (urgente.value = "Importante");
  if (normal.value === true) return (urgente.value = "No importante");
  return "";
};

const submitForm = async () => {
  const userDataValue = {
    id_empleado: id_empleado.value,
    nombre: nombre.value,
    fecha_finalizacion_task: fecha_entraga.value,
    fecha_asignacion_task: Date.now(),
    status: false,
    prioridad: prioridad(),
    descripcion: descripcion.value,
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/creartarea",
      userDataValue
    );
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    return response;
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
  }
};
</script>
