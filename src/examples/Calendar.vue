<template>
  <div class="card widget-calendar mt-4">
    <div class="p-3 pb-0 card-header">
      <h6 class="mb-0">{{ props.title }}</h6>
      <div class="d-flex">
        <div class="mb-0 text-sm p font-weight-bold widget-calendar-day">
          {{ props.day }}
        </div>
        <div class="mb-1 text-sm p font-weight-bold widget-calendar-year">
          {{ props.year }}
        </div>
      </div>
    </div>
    <div class="p-3 card-body">
      <div :id="props.id" data-toggle="widget-calendar"></div>
    </div>
  </div>

  <div
    class="modal fade toast-style"
    id="taskModal"
    tabindex="-1"
    aria-labelledby="taskModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <strong class="me-auto" id="taskModalLabel">Task Details</strong>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" id="taskDescription">
          Hello, world! This is a toast message.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, defineProps } from "vue";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import api from "/src/boot/axios";
import moment from "moment";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { globalState } from "../store/index";

const props = defineProps({
  id: {
    type: String,
    default: "widget-calendar",
  },
  title: {
    type: String,
    default: "",
  },
  day: {
    type: String,
    default: "",
  },
  year: {
    type: String,
    default: "",
  },
  initialView: {
    type: String,
    default: "dayGridMonth",
  },
  initialDate: {
    type: String,
    default: () => new Date().toISOString(),
  },
  selectable: {
    type: Boolean,
    default: true,
  },
  editable: {
    type: Boolean,
    default: true,
  },
  employeeNames: {
    type: String,
    default: "",
  },
});

onMounted(async () => {
  const tareas = [];
  const token = localStorage.getItem("token");
  try {
    const response = await api.get("/tarea", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });

    response.data.forEach((e) => {
      tareas.push({
        title: e.nombre,
        start: moment(e.fecha_finalizacion_task).format("YYYY-MM-DD"),
        extendedProps: {
          fullTitle: e.nombre,
          description: e.descripcion,
        },
      });
    });

    const calendar = new Calendar(document.getElementById(props.id), {
      contentHeight: "auto",
      plugins: [dayGridPlugin],
      initialView: props.initialView,
      selectable: props.selectable,
      editable: props.editable,
      events: tareas,
      initialDate: props.initialDate,
      headerToolbar: {
        start: "title",
        center: "",
        end: "today prev,next",
      },
      views: {
        month: {
          titleFormat: {
            month: "long",
            year: "numeric",
          },
        },
        agendaWeek: {
          titleFormat: {
            month: "long",
            year: "numeric",
            day: "numeric",
          },
        },
        agendaDay: {
          titleFormat: {
            month: "short",
            year: "numeric",
            day: "numeric",
          },
        },
      },
      eventClick: (info) => {
        const modal = new bootstrap.Modal(document.getElementById("taskModal"));
        document.getElementById("taskModalLabel").textContent =
          info.event.extendedProps.fullTitle;
        document.getElementById("taskDescription").textContent =
          `Description: ${info.event.extendedProps.description || "No description available"} \n Employees: ${globalState.employeeNames}`;
        modal.show();
      },
    });

    calendar.render();
  } catch (error) {
    console.error("Error al cargar las tareas:", error);
  }
});

onBeforeUnmount(() => {
  const tooltips = document.querySelectorAll(".tooltip");
  tooltips.forEach((tooltip) => {
    tooltip.parentNode.removeChild(tooltip);
  });
});
</script>

<style scoped>
.toast-style .modal-content {
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  max-width: 400px;
  margin: auto;
}

.toast-style .modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #f8f9fa;
}

.toast-style .modal-body {
  padding: 1rem;
}
</style>
