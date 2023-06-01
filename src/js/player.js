class Galaplayer {
  constructor({ path, rootClassName }) {
    this.path = path;
    this.rootDiv = document.querySelector(`.${rootClassName}`);
    this.rootDiv.setAttribute(
      "style",
      `
      display: flex;
      flex-direction: column;
    `
    );
    this.createSlider();
    this.createButton();
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
  createButton() {
    // створення нижньої панелі для кнопок
    const buttonDiv = document.createElement("div");
    // створення кнопок
    this.startButton = document.createElement("button");
    this.stopButton = document.createElement("button");
    this.pauseButton = document.createElement("button");
    this.startButton.textContent = "Start";
    this.stopButton.textContent = "Stop";
    this.pauseButton.textContent = "Pause";
    // додавання кнопок в панель
    buttonDiv.append(this.startButton);
    buttonDiv.append(this.stopButton);
    buttonDiv.append(this.pauseButton);
    //
    this.rootDiv.append(buttonDiv);
  }
  createSlider() {
    this.slider = document.createElement("div");
    this.handle = document.createElement("div");

    this.slider.setAttribute(
      "style",
      `height: 50%;
      background-color: red;
      display: flex;
      align-items: center`
    );

    this.handle.setAttribute(
      "style",
      `height: 20px;
      width: 20px;
     background-color: yellow`
    );

    this.slider.append(this.handle);
    this.rootDiv.append(this.slider);
  }
}

const player = new Galaplayer({ path: "Hello", rootClassName: "audio" });
