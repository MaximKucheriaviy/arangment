const modalFotos = document.querySelectorAll(".click-foto");
const backdrop = document.querySelector(".backdrop");
const modalImage = document.querySelector(".modal-image");

modalFotos.forEach((item) => {
  item.addEventListener("click", () => {
    modalImage.setAttribute("src", item.getAttribute("src"));
    setTimeout(() => {
      backdrop.classList.toggle("visually-hidden");
    }, 4);
  });
});

backdrop.addEventListener("click", (event) => {
  if (event.target !== backdrop) {
    return;
  }
  backdrop.classList.add("transparent");
  setTimeout(() => {
    backdrop.classList.remove("transparent");
    backdrop.classList.toggle("visually-hidden");
  }, 500);
});
