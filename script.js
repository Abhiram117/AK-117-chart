
let password = "AK117";
let pin = "0720";
let calcInput = "";
let mediaRecorder;
let audioChunks = [];

function checkPassword() {
  const input = document.getElementById("password").value;
  if (input === password) {
    document.getElementById("login").style.display = "none";
    document.getElementById("calculator").style.display = "block";
  } else {
    alert("Wrong password!");
  }
}

function press(val) {
  calcInput += val;
  document.getElementById("calc-display").value = calcInput;
}

function clearCalc() {
  calcInput = "";
  document.getElementById("calc-display").value = "";
}

function calculate() {
  try {
    document.getElementById("calc-display").value = eval(calcInput);
  } catch {
    document.getElementById("calc-display").value = "Error";
  }
}

function checkPIN() {
  if (calcInput === pin) {
    document.getElementById("calculator").style.display = "none";
    document.getElementById("chat").style.display = "block";
  } else {
    alert("Wrong PIN!");
  }
}

function sendMessage() {
  const input = document.getElementById("chat-input");
  const msg = input.value;
  if (msg.trim() !== "") {
    const div = document.createElement("div");
    div.innerHTML = "SGR ❤️: " + msg.replace(/(https?:\/\/[^ ]+)/g, '<a href="$1" target="_blank">$1</a>');
    document.getElementById("chat-box").appendChild(div);
    input.value = "";
  }
}

function sendImage(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const div = document.createElement("div");
    div.innerHTML = 'SGR 📷:<br><img class="chat-img" src="' + e.target.result + '" />';
    document.getElementById("chat-box").appendChild(div);
  };
  if (file) reader.readAsDataURL(file);
}

function translateWord() {
  const input = document.getElementById("chat-input").value.toLowerCase();
  const translator = {
    "thinava": "Did you eat?",
    "vachava": "Did you come?",
    "cheppava": "Did you say?",
    "ekkadunnav": "Where are you?",
    "em chestunnav": "What are you doing?",
    "lekapote": "Otherwise / If not"
  };
  let translation = "";
  for (let key in translator) {
    if (input.includes(key)) {
      translation = "📖: " + translator[key];
      break;
    }
  }
  document.getElementById("translator-box").innerText = translation;
}

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    audioChunks = [];
    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });
  });
}

function stopRecording() {
  mediaRecorder.stop();
  mediaRecorder.addEventListener("stop", () => {
    const audioBlob = new Blob(audioChunks);
    const audioUrl = URL.createObjectURL(audioBlob);
    const div = document.createElement("div");
    div.innerHTML = 'SGR 🎤:<br><audio controls src="' + audioUrl + '"></audio>';
    document.getElementById("chat-box").appendChild(div);
  });
}
