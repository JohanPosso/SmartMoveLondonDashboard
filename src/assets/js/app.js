$(document).ready(function () {
  var table = $("#maintable").DataTable({
    mark: true,
    dom: "Bfrtip",
    lengthMenu: [
      [10, 25, 50, 100, -1],
      ["10 rows", "25 rows", "50 rows", "100 rows", "Show All"],
    ],
    buttons: ["pageLength"],
  });
});
