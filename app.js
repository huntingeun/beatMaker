class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".js-pad");
    this.playBtn = document.querySelector(".play");
    this.kickAudio = document.querySelectorAll(".js-kick-sound");
    this.snareAudio = document.querySelectorAll(".js-snare-sound");
    this.hihatAudio = document.querySelectorAll(".js-hihat-sound");
    this.index = 0;
    this.bpm = 150;
  }
  repeat() {
    const step = this.index % 8;
    const activePads = document.querySelectorAll(`.b${step}`);
    activePads.forEach((pad) => {
      pad.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      if (pad.classList.contains("active")) {
        if (pad.classList.contains("kick-pad")) {
          () => {
            this.kickAudio.play();
          };
        } else if (pad.classList.contains("snare-pad")) {
          () => {
            this.snareAudio.play();
          };
        } else if (pad.classList.contains("hihat-pad")) {
          () => {
            this.hihatAudio.play();
          };
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    setInterval(() => {
      this.repeat();
    }, interval);
  }
  activePad() {
    event.target.classList.toggle("active");
    //this.classList.toggle("active");
    //this keyword로 어떻게 div pad들만 선택될수 있죠???
    //아래에서 pad만 지정해서 클릭 이벤트 만들었으니까, this로 event.target도 선택 가능하니까.
  }
}

const drumKit = new DrumKit();

//drumKit.pads is NodeList which is an array
drumKit.pads.forEach(function (pad) {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  }); //to delete the animation so that it can be added again
});

drumKit.playBtn.addEventListener("click", () => {
  drumKit.start();
});
