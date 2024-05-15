<template>
  <div id="app">
    <link
      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      rel="stylesheet"
      integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
      crossorigin="anonymous"
    />
    <h1>VUE DATA TABLE</h1>
    <main>
      <h2>TABLE 1</h2>
      <br />
      <data-table v-bind="parametersTable1" @actionTriggered="handleAction" />
    </main>
  </div>
</template>

<style lang="css">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
main {
  padding: 32px;
}
</style>

<script setup>
import users from "../../users";

function parametersTable1() {
  return {
    data: users,
    actionMode: "multiple",
    columnKeys: [
      "name",
      "email",
      "gender",
      "country",
      "job",
      "city",
      "created_at",
    ],
  };
}

function handleAction(actionName, data) {
  console.log(actionName, data);
  window.alert("check out the console to see the logs");
}
</script>
