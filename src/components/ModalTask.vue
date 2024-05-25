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
          <!-- Formulario -->
          <form>
            <!-- Selección de Empleados -->
            <div class="mb-3">
              <label for="selectEmpleados" class="form-label"
                >👤 Seleccionar Empleados</label
              >
              <select
                multiple
                v-model="selectedEmpleados"
                class="form-select"
                id="selectEmpleados"
              >
                <option
                  v-for="(user, index) in users"
                  :key="index"
                  :value="user"
                >
                  {{ user.nombres }}
                </option>
              </select>
            </div>

            <!-- Empleados Seleccionados -->
            <div class="mb-3">
              <span class="input-group-text">📞 Empleados Seleccionados</span>
              <ul class="list-group">
                <li
                  v-for="(empleado, index) in selectedEmpleados"
                  :key="index"
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  {{ empleado.nombres }} - {{ empleado.telefono }}
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="removeEmpleado(index)"
                  >
                    X
                  </button>
                </li>
              </ul>
            </div>

            <!-- Otros campos del formulario -->
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
          <div v-if="responseMessage" class="alert alert-info mt-3">
            {{ responseMessage }}
          </div>
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
import api from "/src/boot/axios";

const nombre = ref("");
const fecha_entraga = ref("");
const urgente = ref("");
const importante = ref("");
const normal = ref("");
const descripcion = ref("");
const users = ref([]);
const selectedEmpleados = ref([]);
const responseMessage = ref("");

onMounted(async () => {
  try {
    const response = await api.get("/todo", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    users.value = response.data.filter((user) => user.status);
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
  }
});

const prioridad = () => {
  if (urgente.value) return "Urgente";
  if (importante.value) return "Importante";
  if (normal.value) return "No importante";
  return "";
};

const removeEmpleado = (index) => {
  selectedEmpleados.value.splice(index, 1);
};

const sendWhatsapp = async (userDataValue) => {
  try {
    const messages = selectedEmpleados.value.map((empleado) => ({
      to: `${empleado.telefono}`,
      msg: `
        🚨*NUEVA TAREA - SMART MOVE LONDON*🚨

        Prioridad: *${userDataValue.prioridad}*
        -------------------------
        Nombre: *${userDataValue.nombre}*
        -------------------------
        Fecha de Fin: *${userDataValue.fecha_finalizacion_task}*
        -------------------------
        *Descripción*: ${userDataValue.descripcion}
      `,
    }));

    const response = await api.post("/sendmsg", messages);
    responseMessage.value = response.data.resp;
    return response;
  } catch (error) {
    responseMessage.value = "Error al enviar los mensajes.";
    console.log(error);
  }
};

const submitForm = async () => {
  const userDataValue = {
    id_empleado: selectedEmpleados.value.map((e) => e.id_empleado),
    nombre: nombre.value,
    fecha_finalizacion_task: fecha_entraga.value,
    fecha_asignacion_task: Date.now(),
    status: false,
    prioridad: prioridad(),
    descripcion: descripcion.value,
  };

  try {
    const response = await api.post("/creartarea", userDataValue);
    await sendWhatsapp(userDataValue);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    return response;
  } catch (error) {
    responseMessage.value = "Error al crear la tarea.";
    console.error("Error al crear la tarea:", error);
  }
};
</script>
