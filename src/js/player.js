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
    this.sliderSetup();
    // завантажуємо звук
    this.song = new Audio("./Summerfogle.mp3");
    // мазначаємо методи для кнопок
    this.startButton.addEventListener("click", this.onPlay);
    this.pauseButton.addEventListener("click", this.onPause);
    this.stopButton.addEventListener("click", this.onStop);

    this.moving = false;
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
    this.xPos = 0;

    this.slider.setAttribute(
      "style",
      `height: 50%;
      background-color: bisque;
      display: flex;
      align-items: center;
      padding-left: 10px;`
    );

    this.handle.setAttribute(
      "style",
      `left: 0px;
    height: 20px;
      width: 20px;
     background-color: cornflowerblue;
     position: relative;`
    );

    this.slider.append(this.handle);
    this.rootDiv.append(this.slider);
  }
  sliderSetup = () => {
    this.rightMax = this.slider.offsetWidth - 40;
    this.handle.addEventListener("mousedown", this.onMouseDown);
  };
  onMove = (event) => {
    this.xPos += event.movementX;
    if (this.xPos > this.rightMax) {
      this.xPos = this.rightMax;
    }
    if (this.xPos < 0) {
      this.xPos = 0;
    }
    this.setHandlePosition(this.xPos);
  };
  onMouseDown = () => {
    document.addEventListener("mousemove", this.onMove);
    document.addEventListener("mouseup", this.onMouseUp);
    this.moving = true;
  };
  onMouseUp = () => {
    document.removeEventListener("mousemove", this.onMove);
    const present = (this.xPos * 100) / this.rightMax;
    this.song.currentTime = (present * this.song.duration) / 100;
    this.moving = false;
  };
  onPlay = () => {
    this.song.play();
    this.sliderInterval = setInterval(this.sliderProcess, 200);
  };
  onPause = () => {
    clearInterval(this.sliderInterval);
    this.song.pause();
  };
  onStop = () => {
    clearInterval(this.sliderInterval);
    this.song.pause();
    this.song.currentTime = 0;
    this.xPos = 0;
    this.setHandlePosition();
  };
  sliderProcess = () => {
    if (this.moving) {
      return;
    }
    const time = this.song.currentTime;
    const duration = this.song.duration;
    const songPresent = (time * 100) / duration;
    this.xPos = (songPresent * this.rightMax) / 100;
    this.setHandlePosition();
  };
  setHandlePosition = () => {
    this.handle.setAttribute(
      "style",
      `left: ${this.xPos}px;
    height: 20px;
      width: 20px;
     background-color: cornflowerblue;
     position: relative;`
    );
  };
}

const player = new Galaplayer({ path: "Hello", rootClassName: "audio" });
