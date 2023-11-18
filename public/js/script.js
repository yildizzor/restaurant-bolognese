// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("restaurant-bolognese JS imported successfully!");

  (function () {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();

  (function () {
    // Get the current date
    const currentDate = new Date();

    // Set the minimum date to the current date
    const minDate = currentDate.toISOString().split("T")[0];
    document.getElementById("reservation-date").min = minDate;

    // Set the maximum date to 30 days from the current date
    currentDate.setDate(currentDate.getDate() + 30);
    const maxDate = currentDate.toISOString().split("T")[0];
    document.getElementById("reservation-date").max = maxDate;
  })();
});
