let pinCorrect = "AK117";
let calcPassword = "0720";
let calcInput = "";

function checkPin() {
  const input = document.getElementById("pinInput").value;
  if (input === pinCorrect) {
    document.getElementById("pinScreen").style.display = "none";
    document.getElementById("calculatorScreen").style.display = "flex";
  } else {
    document.getElementById("pinMessage").textContent = "Wrong PIN";
  }
}

function press(val) {
  calcInput += val;
  document.getElementById("calcDisplay").textContent = calcInput;
}

function clearDisplay() {
  calcInput = "";
  document.getElementById("calcDisplay").textContent = "0";
}

function backspace() {
  calcInput = calcInput.slice(0, -1);
  document.getElementById("calcDisplay").textContent = calcInput || "0";
}

function calculate() {
  if (calcInput === calcPassword) {
    document.getElementById("calculatorScreen").style.display = "none";
    document.getElementById("chatScreen").style.display = "flex";
    loadMessages();
  } else {
    document.getElementById("calcDisplay").textContent = "Wrong Code";
    calcInput = "";
  }
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const box = document.getElementById("chatBox");
  const msg = document.createElement("div");
  msg.className = "message self";
  msg.innerHTML = input.value + ' <span class="delete-btn" onclick="this.parentElement.remove(); saveMessages()">🗑️</span>';
  box.appendChild(msg);
  input.value = "";
  saveMessages();
}

function saveMessages() {
  localStorage.setItem("chat_history", document.getElementById("chatBox").innerHTML);
}

function loadMessages() {
  const data = localStorage.getItem("chat_history");
  if (data) {
    document.getElementById("chatBox").innerHTML = data;
  }
}

function startVoice() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Not supported");
    return;
  }
  const rec = new webkitSpeechRecognition();
  rec.lang = 'en-IN';
  rec.start();
  rec.onresult = function(event) {
    document.getElementById("chatInput").value = event.results[0][0].transcript;
  };
}

function translateMessage() {
  const input = document.getElementById("chatInput");
  const word = input.value.toLowerCase();
  const dict = {
    "thinava": "Did you eat?",
    "cheppava": "Did you say?"
  };
  for (let key in dict) {
    if (word.includes(key)) {
      input.value = dict[key];
      break;
    }
  }
}
