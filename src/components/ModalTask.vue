<template>
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#createTask"
  >
    Create task
  </button>

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
            Create new task
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="selectEmpleados" class="form-label"
                >👤 Select employees</label
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
              <span class="input-group-text">📞 Selected employees</span>
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
              <span class="input-group-text" id="nombre">📝 Task Name</span>
              <input
                v-model="nombre"
                type="text"
                class="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                id="nombre"
                name="nombre"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="employeeNames">👥 Team</span>
              <input
                v-model="employeeNames"
                type="text"
                class="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                id="employeeNames"
                name="employeeNames"
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="nombre">📍 Address</span>
              <input
                v-model="direccion"
                type="text"
                class="form-control"
                aria-label="address"
                aria-describedby="basic-addon1"
                id="direccion"
                name="direccion"
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

            <div class="input-group mb-3">
              <span class="input-group-text" id="">🕐</span>
              <input
                type="time"
                class="form-control"
                aria-label="hour"
                aria-describedby="basic-addon1"
                id="hora"
                name="hora"
                v-model="hora"
              />
            </div>

            <hr />

            <h5 class="text-center">Priority</h5>
            <div class="flex-item d-flex justify-content-around mb-3">
              <div class="form-check form-switch">
                <input
                  v-model="urgente"
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="urgente"
                />
                <label class="form-check-label" for="urgente">Urgent</label>
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
                  >Important</label
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
                <label class="form-check-label" for="normal"
                  >Less important</label
                >
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
            Submit
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
const hora = ref("");
const direccion = ref("");
const descripcion = ref("");
const users = ref([]);
const selectedEmpleados = ref([]);
const responseMessage = ref("");
const employeeNames = ref("");

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
    return error;
  }
});

const prioridad = () => {
  if (urgente.value) return "Urgent";
  if (importante.value) return "Important";
  if (normal.value) return "Less important";
  return "";
};

const removeEmpleado = (index) => {
  selectedEmpleados.value.splice(index, 1);
};

const sendWhatsapp = async (userDataValue) => {
  try {
    const messages = selectedEmpleados.value.map((empleado) => ({
      to: `+${empleado.telefono}`,
      msg: `
        🚨*NEW TASK - SMART MOVE LONDON*🚨

        Priority: *${userDataValue.prioridad}*
        -------------------------
        Name: *${userDataValue.nombre}*
        -------------------------
        Time: *${userDataValue.hora}*
        -------------------------
        Address: *${userDataValue.direccion}*
        -------------------------
        End Date: *${userDataValue.fecha_finalizacion_task}*
        -------------------------
        Team: *${userDataValue.equipo}*
        -------------------------
        *Description*: ${userDataValue.descripcion}
      `,
    }));

    const response = await api.post("/sendmsg", messages);
    responseMessage.value = response.data.resp;
    return response;
  } catch (error) {
    responseMessage.value = "Error sending messages.";
  }
};

const submitForm = async () => {
  const userDataValue = {
    id_empleado: selectedEmpleados.value.map((e) => e.id_empleado),
    nombre: nombre.value,
    fecha_finalizacion_task: fecha_entraga.value,
    fecha_asignacion_task: Date.now(),
    status: false,
    direccion: direccion.value,
    hora: hora.value,
    prioridad: prioridad(),
    equipo: employeeNames.value,
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
    responseMessage.value = "Error creating the task.";
  }
};
</script>
