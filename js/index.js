// app.js
const answer = "APPLE";
let attempts = 0;
let index = 0;
let pausedTime = 0;

document.addEventListener("DOMContentLoaded", function () {
  // 타이머 업데이트 함수
  let starttime = new Date();
  function cntTime() {
    const currentTime = new Date();
    const runningTime = new Date(currentTime - starttime);
    const minutes = runningTime.getMinutes().toString().padStart(2, "0");
    const seconds = runningTime.getSeconds().toString().padStart(2, "0");
    const timeString = `진행시간 : ${minutes}:${seconds}`;

    // 타이머 업데이트
    const timerElement = document.querySelector(".timelapse");
    if (timerElement) {
      timerElement.innerText = timeString;
    }
  }

  const playTime = document.querySelector(".btn-media__play-img");
  const pauseTime = document.querySelector(".btn-media__pause-img");

  playTime.addEventListener("click", timePlay);
  pauseTime.addEventListener("click", timePause);

  function timePause() {
    clearInterval(timer);
    pausedTime = new Date() - starttime;
    console.log("일시정지");
  }

  function timePlay() {
    starttime = new Date() - pausedTime;
    timer = setInterval(cntTime, 1000);
    console.log("재생");
  }

  // 1초마다 타이머 업데이트
  timer = setInterval(cntTime, 1000);
});

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.classList.add("game-over");
    div.innerText = "게임종료";
    document.body.appendChild(div);
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
  };

  const handleBackspace = (thisBlock) => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index === 0) return;
    else index -= 1;
  };

  const handleEnterKey = () => {
    let cntCorrect = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const keyBlock = document.getElementById(block.innerText.toUpperCase());
      const answerWord = answer[i];
      const inputWord = block.innerText;
      block.classList.add("check-answer");
      if (inputWord === answerWord) {
        cntCorrect += 1;
        block.classList.add("corrected");
        keyBlock.className = "key-block";
        keyBlock.classList.add("corrected");
      } else if (answer.includes(inputWord)) {
        block.classList.add("included");
        keyBlock.className = "key-block";
        keyBlock.classList.add("included");
      } else {
        block.classList.add("wronged");
        keyBlock.className = "key-block";
        keyBlock.classList.add("wronged");
      }
    }
    if (cntCorrect === 5) gameover();
    else nextLine();
  };

  const handleKeydown = (e) => {
    const key = e.key;
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (e.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (e.key === "Enter") handleEnterKey();
      else return;
    } else if (e.keyCode >= 65 && e.keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  window.addEventListener("keydown", handleKeydown);
}

appStart();

window.addEventListener("keydown", (e) => {
  const key = document.getElementById(e.key.toUpperCase());
  if (key) key.classList.add("pressed");
});

window.addEventListener("keyup", (e) => {
  const key = document.getElementById(e.key.toUpperCase());
  if (key) key.classList.remove("pressed");
});

// 그 언젠가 이걸로도 완성해보기
// window.addEventListener("keydown", (e) => {
//   const key = e.key;
//   const alpha = document.querySelectorAll(".board-block");
//   const thisBlock = document.querySelector(
//     `.board-block[data-index=${attempts}${index}]`
//   );

//   if (index === 5) {
//     return;
//   } else if ((e.key = backspace)) {
//   } else if (emptyBlock && e.keyCode >= 65 && e.keyCode <= 90) {
//     emptyBlock.innerText = e.key;
//     index += 1;
//     console.log(emptyBlockIndex);
//   }
// });
