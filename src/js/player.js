const buttonStyle = `
  background-image: url("https://docs.google.com/uc?id=1Gdu_vgvWUg5AcoatJgf5NGFmC4e0zB6d")
`;

class Galaplayer {
  constructor({ path, rootClassName, songName }) {
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
    this.createSongName(songName);
    // завантажуємо звук
    this.song = new Audio("./Summerfogle.mp3");
    // мазначаємо методи для кнопок
    this.startButton.addEventListener("click", this.onPlay);
    this.pauseButton.addEventListener("click", this.onPause);
    this.stopButton.addEventListener("click", this.onStop);
    this.moving = false;
  }
  createButtonStyle() {
    return `
      width: 22px;
      height: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: none;
    `;
  }
  createButton() {
    // створення нижньої панелі для кнопок
    const buttonDiv = document.createElement("div");
    // створення кнопок
    this.startButton = document.createElement("button");
    this.stopButton = document.createElement("button");
    this.pauseButton = document.createElement("button");

    this.startButton.setAttribute("style", this.createButtonStyle());
    this.stopButton.setAttribute("style", this.createButtonStyle());
    this.pauseButton.setAttribute("style", this.createButtonStyle());

    buttonDiv.setAttribute(
      "style",
      `
      display: flex;
      justify-content: center;
      gap: 18px;
    `
    );

    Galaplayer.addIMGOnButtonObject(
      this.startButton,
      "https://docs.google.com/uc?id=1Gdu_vgvWUg5AcoatJgf5NGFmC4e0zB6d"
    );
    Galaplayer.addIMGOnButtonObject(
      this.pauseButton,
      "https://docs.google.com/uc?id=1b5o83exKkeLF7ZQjJgs2wSQd5jbtHMJ1"
    );
    Galaplayer.addIMGOnButtonObject(
      this.stopButton,
      "https://docs.google.com/uc?id=1iid30Xtp8G46d-LV2jfO2hqairJ77eJz"
    );

    // додавання кнопок в панель
    buttonDiv.append(this.pauseButton);
    buttonDiv.append(this.startButton);
    buttonDiv.append(this.stopButton);
    //
    this.rootDiv.append(buttonDiv);
  }
  createSongName(songName) {
    const title = document.createElement("p");
    title.textContent = songName;
    this.rootDiv.prepend(title);
  }
  createSlider() {
    this.slider = document.createElement("div");
    this.handle = document.createElement("div");
    this.line = document.createElement("div");
    this.xPos = 0;

    this.slider.setAttribute(
      "style",
      `height: 50%;
      background-color: transparent;
      display: flex;
      align-items: center;
      padding-left: 10px;`
    );

    this.line.setAttribute(
      "style",
      `height: 2px;
      width: calc(100% - 30px);
      background-color: white;
      `
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
    this.slider.append(this.line);
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
  static addIMGOnButtonObject(object, url, alt) {
    const image = document.createElement("img");
    image.setAttribute(
      "style",
      `
      width: 100%;
      height: 100%;
    `
    );
    image.setAttribute("src", url);
    image.setAttribute("alt", alt);
    object.append(image);
  }
}

const player = new Galaplayer({
  path: "Hello",
  rootClassName: "audio",
  songName: "Somarfogel",
});
