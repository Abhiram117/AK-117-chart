
const password = "AK117";
const pinCode = "0720";
let currentUser = "SGR";

function checkPassword() {
  const input = document.getElementById("site-password").value;
  if (input === password) {
    document.getElementById("password-screen").classList.add("hidden");
    document.getElementById("calculator-screen").classList.remove("hidden");
  } else {
    document.getElementById("wrong-pass").classList.remove("hidden");
  }
}

function press(value) {
  const display = document.getElementById("calc-display");
  display.value += value;
}

function clearDisplay() {
  document.getElementById("calc-display").value = "";
}

function calculate() {
  const display = document.getElementById("calc-display");
  if (display.value === pinCode) {
    document.getElementById("calculator-screen").classList.add("hidden");
    document.getElementById("chatBox").classList.remove("hidden");
    showMessages();
  } else {
    display.value = "Wrong PIN";
  }
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const msg = input.value.trim();
  if (!msg) return;

  const messages = JSON.parse(localStorage.getItem("messages") || "[]");
  messages.push({ from: currentUser, text: msg, time: new Date().toLocaleTimeString() });
  localStorage.setItem("messages", JSON.stringify(messages));
  input.value = "";
  showMessages();
}

function showMessages() {
  const messages = JSON.parse(localStorage.getItem("messages") || "[]");
  const chatWindow = document.getElementById("messages");
  chatWindow.innerHTML = "";
  messages.forEach(msg => {
    const bubble = \`
      <div style="margin-bottom:10px;">
        <strong>\${msg.from} ❤️</strong>: \${msg.text}
        <div style="font-size:10px; color:#ccc;">\${msg.time}</div>
      </div>
    \`;
    chatWindow.innerHTML += bubble;
  });
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
