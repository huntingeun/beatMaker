class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".js-pad"); //this is an array of NodeList
    this.playBtn = document.querySelector(".js-play");
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentSnare = "./sounds/snare-acoustic01.wav";
    this.currentHihat = "./sounds/hihat-acoustic01.wav";
    this.kickAudio = document.querySelector(".js-kick-sound");
    this.snareAudio = document.querySelector(".js-snare-sound");
    this.hihatAudio = document.querySelector(".js-hihat-sound");
    this.index = 0;
    this.bpm = 200;
    this.isPlaying = null; //base false
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
  }
  repeat() {
    const step = this.index % 8;
    const activePads = document.querySelectorAll(`.b${step}`);
    activePads.forEach((pad) => {
      pad.style.animation = `playTrackCss 0.3s alternate ease-in-out 2`;
      if (pad.classList.contains("active")) {
        if (pad.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0; //currentTime = 1; 1초부터시작
          this.kickAudio.play();
        }
        if (pad.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (pad.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++; //이게 반복 위해 중요해! index change. step change. activePads change.
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (this.isPlaying) {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
      //this.isPlaying becomes not null but 1 (setInterval run count) here.
    }
  }
  updateBtn() {
    if (this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }
  changeSound(e) {
    const selectedName = e.target.name;
    const selectedValue = e.target.value;
    switch (selectedName) {
      case "kick-select":
        this.kickAudio.src = selectedValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectedValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectedValue;
        break;
    }
  }
  muteSound(e) {
    const muteIndex = e.target.id;
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }
  activePad() {
    this.classList.toggle("active");
    //=event.target.classList.toggle("active");
    //this keyword로 어떻게 div pad들만 선택될수 있죠???
    //아래에서 pad만 지정해서 클릭 이벤트 만들었으니까, this로 event.target도 선택 가능하니까.
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach(function (pad) {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  }); //to delete the animation so that it can be added again. two animation not possible
});

drumKit.playBtn.addEventListener("click", () => {
  drumKit.start(); //start first then updateBtn
  drumKit.updateBtn();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.muteSound(e);
  });
});
