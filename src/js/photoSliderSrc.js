const photosUrl = [];
for (let i = 1; i <= 10; i++) {
  photosUrl.push(`./RepetitionPhoto/photo${i}.jpg`);
}
class RotorHolder {
  constructor(items) {
    this.items = items;
    this.current = 0;
  }
  getNext() {
    this.current += 1;
    if (this.current >= this.items.length) {
      this.current = 0;
    }
    return this.getCurrent();
  }
  getCurrent() {
    return this.items[this.current];
  }
  getPrevious() {
    this.current -= 1;
    if (this.current < 0) {
      this.current = this.items.length - 1;
    }
    return this.getCurrent();
  }
}

const addreses = new RotorHolder(photosUrl);
let type = true;
const nextButton = document.querySelector(".next-button");
const prevButton = document.querySelector(".prev-button");

const firstFoto = document.querySelector(".first-foto");
const secondFoto = document.querySelector(".second-foto");

function rightTurn() {
  if (type) {
    secondFoto.querySelector("img").setAttribute("src", addreses.getNext());
  } else {
    firstFoto.querySelector("img").setAttribute("src", addreses.getNext());
  }
  secondFoto.classList.toggle("hiddenFoto");
  secondFoto.classList.toggle("visibleFoto");
  firstFoto.classList.toggle("hiddenFoto");
  firstFoto.classList.toggle("visibleFoto");
  type = !type;
}

function leftTurn() {
  if (type) {
    secondFoto.querySelector("img").setAttribute("src", addreses.getPrevious());
  } else {
    firstFoto.querySelector("img").setAttribute("src", addreses.getPrevious());
  }
  secondFoto.classList.toggle("hiddenFoto");
  secondFoto.classList.toggle("visibleFoto");
  firstFoto.classList.toggle("hiddenFoto");
  firstFoto.classList.toggle("visibleFoto");
  type = !type;
}

nextButton.addEventListener("click", () => {
  rightTurn();
});

prevButton.addEventListener("click", () => {
  leftTurn();
});
