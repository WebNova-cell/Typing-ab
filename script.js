const wordList = [
  "javascript","coding","project","keyboard","practice",
  "speed","accuracy","challenge","developer","function"
];

const displayBox = document.getElementById("text-container");
const inputField = document.getElementById("input-box");
const timeBox = document.getElementById("timer");
const restartBtn = document.getElementById("try-again");
const resultArea = document.getElementById("final-score");
const mistakeBox = document.getElementById("errors");
const precisionBox = document.getElementById("accuracy");

let testText = makeText();
let countdown = 60;
let timerId;
let mistakeCount = 0;

displayBox.textContent = testText;

// Generate random text
function makeText() {
  return [...wordList].sort(() => Math.random() - 0.5).join(" ");
}

// Start countdown
function runTimer() {
  timerId = setInterval(() => {
    countdown--;
    timeBox.textContent = countdown;
    if (countdown <= 0) {
      clearInterval(timerId);
      stopTest();
    }
  }, 1000);
}

// Typing check
inputField.addEventListener("input", () => {
  const typed = inputField.value;
  mistakeCount = 0;
  displayBox.innerHTML = "";

  testText.split("").forEach((ch, idx) => {
    const span = document.createElement("span");
    if (idx < typed.length) {
      if (typed[idx] === ch) {
        span.className = "correct";
      } else {
        span.className = "error";
        mistakeCount++;
      }
    }
    span.textContent = ch;
    displayBox.appendChild(span);
  });

  mistakeBox.textContent = mistakeCount;
  let precision = typed.length 
    ? (((typed.length - mistakeCount) / typed.length) * 100).toFixed(0) 
    : 100;
  precisionBox.textContent = precision + "%";
});

// End test
function stopTest() {
  inputField.disabled = true;
  resultArea.textContent = `⌛ Finished! Accuracy: ${precisionBox.textContent}, Mistakes: ${mistakeCount}`;
}

// Restart
restartBtn.addEventListener("click", () => {
  clearInterval(timerId);
  countdown = 60;
  timeBox.textContent = countdown;
  inputField.value = "";
  inputField.disabled = false;
  testText = makeText();
  displayBox.textContent = testText;
  mistakeCount = 0;
  mistakeBox.textContent = mistakeCount;
  precisionBox.textContent = "100%";
  resultArea.textContent = "";
  runTimer();
});

// Start immediately
runTimer();