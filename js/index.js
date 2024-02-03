// app.js
const answer = "APPLE";
let attempts = 0;
let index = 0;

document.addEventListener("DOMContentLoaded", function () {
  // 타이머 업데이트 함수
  const starttime = new Date();
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
  // 1분마다 타이머 업데이트
  timer = setInterval(cntTime, 1000);
});

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임종료";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left: 45vw";
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
      const inputWord = block.innerText;
      const answerWord = answer[i];
      if (inputWord === answerWord) {
        cntCorrect += 1;
        block.style.background = "#6aaa64";
      } else if (answer.includes(inputWord)) block.style.background = "#C9B458";
      else block.style.background = "#787c7e";
      block.style.color = "white";
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
