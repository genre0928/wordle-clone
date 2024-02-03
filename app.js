// app.js

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
  setInterval(cntTime, 1000);
});

function handleOnInput(e) {
  e.value = e.value.replace(/[^A-Za-z]/gi, "");
}

window.addEventListener("keydown", (e) => {
  const key = document.getElementById(e.key);
  const alpha = document.querySelectorAll(".board-block");
  let emptyBlock = Array.from(alpha).find((block) => block.textContent === "");

  if (emptyBlock) {
    emptyBlock.innerText = e.key;
  }
});
