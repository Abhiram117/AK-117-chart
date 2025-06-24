const firebaseConfig = {
  apiKey: "AIzaSyBRKTf8CVeGQ7I7ME4nNRkNkPvK6QLb3RY",
  authDomain: "ak117-ada98.firebaseapp.com",
  databaseURL: "https://ak117-ada98-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ak117-ada98",
  storageBucket: "ak117-ada98.appspot.com",
  messagingSenderId: "774795547448",
  appId: "1:774795547448:web:08d26566bea5d951b627cd"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let nickname = localStorage.getItem("nick");
if (!nickname) {
  nickname = prompt("Enter your name (SGR or AKSGR)");
  localStorage.setItem("nick", nickname);
}

let failCount = 0;
let lockTime = 0;

function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  const now = Date.now();
  if (input === "117") {
    document.getElementById("passwordScreen").style.display = "none";
    document.getElementById("calculator").style.display = "block";
    return;
  }
  if (now < lockTime) {
    document.getElementById("lockMessage").textContent = "Locked. Wait " + Math.ceil((lockTime - now) / 1000) + "s";
    return;
  }
  failCount++;
  if (failCount >= 5) {
    lockTime = now + 30000;
    document.getElementById("lockMessage").textContent = "Too many attempts! Wait 30 seconds.";
    setTimeout(() => document.getElementById("lockMessage").textContent = "", 30000);
  } else {
    document.getElementById("lockMessage").textContent = "Wrong PIN! Attempts left: " + (5 - failCount);
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
function showChat() {
  document.getElementById("calculator").style.display = "none";
  document.getElementById("chatScreen").style.display = "flex";
}

function sendMessage() {
  const msg = document.getElementById("chatInput").value.trim();
  if (msg) {
    db.ref("messages").push({ name: nickname, text: msg });
    document.getElementById("chatInput").value = "";
  }
}

db.ref("messages").on("child_added", (snapshot) => {
  const data = snapshot.val();
  const chatBox = document.getElementById("chatBox");
  const msg = document.createElement("div");
  msg.className = "message " + (data.name === nickname ? "self" : "other");
  msg.textContent = `${data.name}: ${data.text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
});

function startVoice() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Voice not supported");
    return;
  }
  const recog = new webkitSpeechRecognition();
  recog.lang = "en-IN";
  recog.start();
  recog.onresult = e => {
    document.getElementById("chatInput").value = e.results[0][0].transcript;
  };
}

function translateMessage() {
  const input = document.getElementById("chatInput");
  const word = input.value.toLowerCase();
  const translator = {
    thinava: "Did you eat?",
    vachava: "Did you come?",
    cheppava: "Did you say?",
    ekkadunnav: "Where are you?",
    "em chestunnav": "What are you doing?",
    lekapote: "Otherwise / If not"
  };
  for (let key in translator) {
    if (word.includes(key)) {
      input.value = translator[key];
      break;
    }
  }
}
