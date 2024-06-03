<template>
  <main>
    <div class="container-fluid">
      <div
        class="page-header min-height-300"
        style="
          background-image: url(&quot;https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80&quot;);
          margin-right: -24px;
          margin-left: -34%;
        "
      >
        <span class="mask bg-gradient-success opacity-6"></span>
      </div>
      <div class="card shadow-lg mt-n6">
        <div class="card-body p-3">
          <div class="row gx-4">
            <div class="col-auto">
              <div class="avatar avatar-xl position-relative">
                <img
                  src="../assets/img/foto-ovidio.png"
                  alt="profile_image"
                  class="shadow-sm w-100 border-radius-lg"
                />
              </div>
            </div>
            <div class="col-auto my-auto">
              <div class="h-100">
                <h5 class="mb-1">Ovidiu Gusa</h5>
                <p class="mb-0 font-weight-bold text-sm">
                  Director at Smart Move London
                </p>
              </div>
            </div>
            <div
              class="mx-auto mt-3 col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0"
            ></div>
          </div>
        </div>
      </div>
    </div>
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
                  >Guardar</argon-button
                >
              </div>
            </div>
            <div class="card-body">
              <p class="text-uppercase text-sm">USER INFORMATION</p>
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
  </main>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import api from "/src/boot/axios";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";

const body = document.getElementsByTagName("body")[0];
const store = useStore();
const router = useRouter();
const genero = ref("");
const nombres = ref("");
const primer_apellido = ref();
const segundo_apellido = ref();
const email = ref();
const telefono = ref();
const fecha_nacimiento = ref();
const direccion = ref();
const ciudad = ref();
const pais = ref();
const postcode = ref();

const userData = ref({
  genero,
  nombres,
  primer_apellido,
  segundo_apellido,
  email,
  telefono,
  fecha_nacimiento,
  direccion,
  ciudad,
  pais,
  postcode,
});

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
  try {
    const response = await api.post("/crear", userData.value);
    console.log(response.data);
    router.push("/empleados");
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
  }
};
</script>
