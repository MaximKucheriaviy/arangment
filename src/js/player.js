class Galaplayer {
  constructor({ path, rootClassName }) {
    this.path = path;
    this.rootDiv = document.querySelector(`.${rootClassName}`);
    // створення кнопок
    this.startButton = document.createElement("button");
    this.stopButton = document.createElement("button");
    this.pauseButton = document.createElement("button");
    this.startButton.textContent = "Start";
    this.stopButton.textContent = "Stop";
    this.pauseButton.textContent = "Pause";
    // додавання кнопок в панель
    this.rootDiv.append(this.startButton);
    this.rootDiv.append(this.stopButton);
    this.rootDiv.append(this.pauseButton);
    // завантажуємо звук
    this.song = new Audio("./Summerfogle.mp3");
    // мазначаємо методи для кнопок
    this.startButton.addEventListener("click", () => {
      this.song.play();
    });
    this.pauseButton.addEventListener("click", () => {
      this.song.pause();
    });
    this.stopButton.addEventListener("click", () => {
      this.song.pause();
      this.song.currentTime = 0;
    });
  }
}

const player = new Galaplayer({ path: "Hello", rootClassName: "audio" });
