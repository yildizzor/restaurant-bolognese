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
    const reservation = document.getElementById("reservation-date");

    if (reservation) {
      // Set the minimum date to the current date
      const minDate = currentDate.toISOString().split("T")[0];
      reservation.min = minDate;

      // Set the maximum date to 30 days from the current date
      currentDate.setDate(currentDate.getDate() + 30);
      const maxDate = currentDate.toISOString().split("T")[0];
      reservation.max = maxDate;
    }
  })();

  const ratingContainer = document.getElementById("rating-container");
  const ratingInput = document.getElementById("rating");

  if (ratingContainer) {
    // Create stars dynamically
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.classList.add("rating-star");
      star.innerHTML = "&#9733;"; // Star character
      star.dataset.ratingValue = i;
      star.addEventListener("click", function () {
        updateRating(i);
      });
      ratingContainer.appendChild(star);
    }
  }

  const ratings = document.querySelectorAll(".customer-rating");

  if (ratings) {
    ratings.forEach((rating) => {
      const ratingValue = Number(rating.innerHTML);
      rating.innerHTML = "";
      for (let i = 1; i <= ratingValue; i++) {
        const star = document.createElement("span");
        star.classList.add("rating-star");
        star.classList.add("active");
        star.innerHTML = "&#9733;"; // Star character
        rating.appendChild(star);
      }
    });
  }

  function updateRating(value) {
    const stars = ratingContainer.querySelectorAll(".rating-star");
    stars.forEach((star, index) => {
      star.classList.toggle("active", index < value);
    });

    ratingInput.value = value;
  }
});
