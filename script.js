
let failCount = 0;
let lockTime = 0;
let pinStage = 0;

function checkPIN() {
  const input = document.getElementById("pinInput").value;
  if (input === "AK117") {
    document.getElementById("passwordScreen").style.display = "none";
    document.getElementById("calculatorScreen").style.display = "flex";
    pinStage = 1;
  } else {
    document.getElementById("lockMessage").textContent = "Wrong PIN!";
  }
}

let current = "";
function press(val) {
  current += val;
  document.getElementById("calcDisplay").textContent = current;
}

function calculate() {
  try {
    current = eval(current).toString();
    document.getElementById("calcDisplay").textContent = current;
  } catch {
    current = "";
    document.getElementById("calcDisplay").textContent = "Error";
  }
}

function clearDisplay() {
  current = "";
  document.getElementById("calcDisplay").textContent = "0";
}

function backspace() {
  current = current.slice(0, -1);
  document.getElementById("calcDisplay").textContent = current || "0";
}

function enterToChat() {
  if (current === "0720") {
    document.getElementById("calculatorScreen").style.display = "none";
    document.getElementById("chatScreen").style.display = "flex";
  } else {
    alert("Wrong Chat Code");
  }
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  if (input.value.trim() !== "") {
    const msg = document.createElement("div");
    msg.className = "message self";
    msg.innerHTML = input.value;
    document.getElementById("chatBox").appendChild(msg);
    localStorage.setItem("chatBox", document.getElementById("chatBox").innerHTML);
    input.value = "";
  }
}

function startVoice() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Voice not supported");
    return;
  }
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-IN';
  recognition.start();
  recognition.onresult = function(event) {
    document.getElementById("chatInput").value = event.results[0][0].transcript;
  };
}

function translateMessage() {
  const input = document.getElementById("chatInput");
  const translations = {
    "thinava": "Did you eat?",
    "vachava": "Did you come?",
    "cheppava": "Did you say?"
  };
  for (let key in translations) {
    if (input.value.includes(key)) {
      input.value = translations[key];
    }
  }
}

window.onload = () => {
  const chatBox = document.getElementById("chatBox");
  const saved = localStorage.getItem("chatBox");
  if (saved) chatBox.innerHTML = saved;
};
