
let pinEntered = false;
let calcInput = "";

function checkPassword() {
  const pin = document.getElementById("passwordInput").value;
  if (pin === "AK117") {
    document.getElementById("passwordScreen").style.display = "none";
    document.getElementById("calculator").style.display = "block";
  } else {
    document.getElementById("lockMessage").innerText = "Wrong PIN!";
  }
}

function press(val) {
  calcInput += val;
  document.getElementById("calcDisplay").innerText = calcInput;
}

function calculate() {
  if (calcInput === "0720") {
    document.getElementById("calculator").style.display = "none";
    document.getElementById("chatScreen").style.display = "flex";
  } else {
    try {
      calcInput = eval(calcInput).toString();
      document.getElementById("calcDisplay").innerText = calcInput;
    } catch {
      calcInput = "";
      document.getElementById("calcDisplay").innerText = "Error";
    }
  }
}

function clearDisplay() {
  calcInput = "";
  document.getElementById("calcDisplay").innerText = "0";
}

function backspace() {
  calcInput = calcInput.slice(0, -1);
  document.getElementById("calcDisplay").innerText = calcInput || "0";
}

function showChat() {
  document.getElementById("calculator").style.display = "none";
  document.getElementById("chatScreen").style.display = "flex";
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const chatBox = document.getElementById("chatBox");
  if (input.value.trim()) {
    const msg = document.createElement("div");
    msg.className = "message self";
    msg.innerText = input.value;
    chatBox.appendChild(msg);
    localStorage.setItem("chat", chatBox.innerHTML);
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

window.onload = () => {
  const savedChat = localStorage.getItem("chat");
  if (savedChat) {
    document.getElementById("chatBox").innerHTML = savedChat;
  }
};
