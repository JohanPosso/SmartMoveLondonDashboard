<template>
  <div v-if="!isEditing" class="card">
    <div class="card-header pb-0">
      <h6>Employees</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Name
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Phone
              </th>

              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Status
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Country
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Option
              </th>
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
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  ><button @click="editUser(item.id_empleado)" class="btn">
                    Edit
                  </button></span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div v-else class="edit-temple">
    <div class="py-4 container-fluid">
      <div class="row" style="display: ruby">
        <div class="col-md-9">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <argon-button
                  @click="submitForm"
                  color="success"
                  size="sm"
                  class="ms-auto"
                  >Submit</argon-button
                >
              </div>
            </div>
            <div class="card-body">
              <p class="text-uppercase text-sm">EDIT USER INFORMATION</p>
              <div class="row">
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Gender</label
                  >
                  <select
                    class="form-select"
                    v-model="genero"
                    id="floatingSelect"
                  >
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Name *</label
                  >
                  <input
                    id="nombres"
                    v-model="nombres"
                    class="form-control"
                    type="text"
                  />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Surname *</label
                  >
                  <argon-input
                    id="primer_apellido"
                    v-model="primer_apellido"
                    type="text"
                  />
                </div>

                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Second surname</label
                  >
                  <argon-input v-model="segundo_apellido" type="text" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Email *</label
                  >
                  <argon-input v-model="email" type="email" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Phone *</label
                  >
                  <argon-input v-model="telefono" type="phone" />
                </div>

                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Date of Birth</label
                  >
                  <argon-input v-model="fecha_nacimiento" type="date" />
                </div>
              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">Residence Information</p>
              <div class="row">
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label"
                    >Address</label
                  >
                  <argon-input v-model="direccion" type="text" />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                    >City</label
                  >
                  <argon-input v-model="ciudad" type="text" />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                    >Country</label
                  >
                  <argon-input v-model="pais" type="text" />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                    >Postcode</label
                  >
                  <argon-input v-model="postcode" type="text" />
                </div>
              </div>
              <hr class="horizontal dark" />
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <profile-card />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import api from "/src/boot/axios";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const isEditing = ref(false);
const idEmpleado = ref([]);

const users = ref([]);
onMounted(async () => {
  try {
    const response = await api.get("/todo", {
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
    const response = await api.get(`/statusempleado/${id}`, {
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

const editUser = async (id_empleado) => {
  isEditing.value = true;
  idEmpleado.value.push(id_empleado);
};

const body = document.getElementsByTagName("body")[0];
const store = useStore();
const genero = ref("");
const nombres = ref("");
const primer_apellido = ref();
const segundo_apellido = ref();
const email = ref();
const telefono = ref();
const fecha_nacimiento = ref();
const direccion = ref();
const pais = ref();
const postcode = ref();

onMounted(() => {
  store.state.isAbsolute = true;
  setNavPills();
  setTooltip();
});
onBeforeMount(() => {
  store.state.imageLayout = "profile-overview";
  store.state.showNavbar = false;
  store.state.hideConfigButton = true;
  body.classList.add("profile-overview");
});
onBeforeUnmount(() => {
  store.state.isAbsolute = false;
  store.state.imageLayout = "default";
  store.state.showNavbar = true;
  store.state.hideConfigButton = false;
  body.classList.remove("profile-overview");
});
const submitForm = async () => {
  const id_empleado = idEmpleado.value.map((e) => e);
  const response = await api.put(`/edituser/${id_empleado[0]}`, {
    id_empleado: id_empleado[0],
    nombres: nombres.value,
    primer_apellido: primer_apellido.value,
    segundo_apellido: segundo_apellido.value,
    email: email.value,
    fecha_nacimiento: fecha_nacimiento.value,
    telefono: telefono.value,
    codigo_postal: postcode.value,
    pais: pais.value,
    genero: genero.value,
  });
  setTimeout(() => {
    window.location.reload();
  }, 2000);
  return response.data;
};
</script>

<style scoped>
.btn-status {
  border: none;
}

.btn {
  box-shadow: none;
}
</style>
