const photosUrl = [];
let interval;
const rotIntervalTime = 10000;
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

nextButton.addEventListener("click", rightTurn);
prevButton.addEventListener("click", leftTurn);
interval = setTimeout(() => {
  leftTurn();
}, rotIntervalTime);

function onFotoLoad() {
  interval = setTimeout(() => {
    leftTurn();
  }, rotIntervalTime);
  nextButton.addEventListener("click", rightTurn);
  prevButton.addEventListener("click", leftTurn);
}

function onSecondLoade() {
  onFotoLoad();
  secondFoto.classList.toggle("hiddenFoto");
  secondFoto.classList.toggle("visibleFoto");
  secondFoto.querySelector("img").removeEventListener("load", onSecondLoade);
}
function onFirstLoaded() {
  onFotoLoad();
  firstFoto.classList.toggle("hiddenFoto");
  firstFoto.classList.toggle("visibleFoto");
  firstFoto.querySelector("img").removeEventListener("load", onFirstLoaded);
}

function rightTurn() {
  clearTimeout(interval);
  if (type) {
    secondFoto.querySelector("img").addEventListener("load", onSecondLoade);
    secondFoto.querySelector("img").setAttribute("src", addreses.getNext());
    firstFoto.classList.toggle("hiddenFoto");
    firstFoto.classList.toggle("visibleFoto");
  } else {
    firstFoto.querySelector("img").addEventListener("load", onFirstLoaded);
    firstFoto.querySelector("img").setAttribute("src", addreses.getNext());
    secondFoto.classList.toggle("hiddenFoto");
    secondFoto.classList.toggle("visibleFoto");
  }
  nextButton.removeEventListener("click", rightTurn);
  prevButton.removeEventListener("click", leftTurn);
  type = !type;
}

function leftTurn() {
  clearTimeout(interval);
  if (type) {
    secondFoto.querySelector("img").addEventListener("load", onSecondLoade);
    secondFoto.querySelector("img").setAttribute("src", addreses.getPrevious());
    firstFoto.classList.toggle("hiddenFoto");
    firstFoto.classList.toggle("visibleFoto");
  } else {
    firstFoto.querySelector("img").addEventListener("load", onFirstLoaded);
    firstFoto.querySelector("img").setAttribute("src", addreses.getPrevious());
    secondFoto.classList.toggle("hiddenFoto");
    secondFoto.classList.toggle("visibleFoto");
  }
  nextButton.removeEventListener("click", rightTurn);
  prevButton.removeEventListener("click", leftTurn);
  type = !type;
}
