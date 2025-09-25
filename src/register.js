const form = document.getElementById("form_register");
const btnNext = document.querySelectorAll("#button_next");
const step = document.querySelectorAll(".step");
const circleStep = document.querySelectorAll(".circle-step");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  for (const i in btnNext) {
  }

  btnNext.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (circleStep[i].classList.contains("on")) {
        circleStep[i].classList.remove("on");
      }
      circleStep[i].classList.add("on");
      step[i].classList.add("hide");

      i++;

      if (!circleStep[i].classList.contains("hide")) {
        step[i].classList.remove("hide");
      }

      if (i === step.length) {
        console.log("finalizado");
      }
    });
  });
});
