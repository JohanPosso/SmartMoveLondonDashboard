<script setup>
import { onBeforeUnmount, onMounted, defineProps } from "vue";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import moment from "moment";

let calendar;

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
});

onMounted(async () => {
  const tareas = [];
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:3000/tarea", {
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
      });
    });

    calendar = new Calendar(document.getElementById(props.id), {
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
    });

    calendar.render();
  } catch (error) {
    console.error("Error al cargar las tareas:", error);
  }
});

onBeforeUnmount(() => {
  if (calendar) {
    calendar.destroy();
  }
});
</script>

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
</template>
