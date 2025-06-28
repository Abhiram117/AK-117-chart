let failCount = 0, lockTime = 0, current = "", recording, recordedChunks = [];

function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  const now = Date.now();
  const locked = now < lockTime;

  if (input === "AK117") {
    document.getElementById("passwordScreen").style.display = "none";
    document.getElementById("calculator").style.display = "flex";
    return;
  }
  if (locked) {
    document.getElementById("lockMessage").textContent = "Locked. Wait " + Math.ceil((lockTime - now) / 1000) + "s";
    return;
  }
  failCount++;
  if (failCount >= 5) {
    lockTime = now + 30000;
    document.getElementById("lockMessage").textContent = "Too many wrong attempts! Wait 30 seconds.";
    setTimeout(() => { document.getElementById("lockMessage").textContent = ""; }, 30000);
  } else {
    document.getElementById("lockMessage").textContent = "Wrong PIN! Attempts left: " + (5 - failCount);
  }
}

function press(value) {
  current += value;
  document.getElementById("calcDisplay").textContent = current;
}
function calculate() {
  if (current === "0720") {
    document.getElementById("calculator").style.display = "none";
    document.getElementById("chatScreen").style.display = "flex";
    loadMessages();
    return;
  }
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
function showChat() {
  document.getElementById("calculator").style.display = "none";
  document.getElementById("chatScreen").style.display = "flex";
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const chatBox = document.getElementById("chatBox");
  if (input.value.trim() !== "") {
    const msg = document.createElement("div");
    msg.className = "message self";
    msg.textContent = input.value;
    chatBox.appendChild(msg);
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
    saveMessages();
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
  const word = input.value.toLowerCase();
  const translator = {
    "thinava": "Did you eat?",
    "vachava": "Did you come?",
    "cheppava": "Did you say?",
    "ekkadunnav": "Where are you?",
    "em chestunnav": "What are you doing?",
    "lekapote": "Otherwise / If not"
  };
  for (let key in translator) {
    if (word.includes(key)) {
      input.value = translator[key];
      break;
    }
  }
}

function saveMessages() {
  localStorage.setItem("sgr_chat", document.getElementById("chatBox").innerHTML);
}
function loadMessages() {
  const saved = localStorage.getItem("sgr_chat");
  if (saved) document.getElementById("chatBox").innerHTML = saved;
}

function startRecording() {
  alert("Recording simulated.");
}
function playRecording() {
  alert("Playback simulated.");
}

window.onload = loadMessages;
