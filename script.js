
const secretPIN = "117117";

function checkPIN() {
  const pin = document.getElementById("pin").value;
  if (pin === secretPIN) {
    document.getElementById("calculator").style.display = "none";
    document.getElementById("chat").style.display = "block";
  } else {
    alert("Wrong PIN!");
  }
}

function appendValue(val) {
  document.getElementById("display").value += val;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function calculate() {
  const result = eval(document.getElementById("display").value);
  document.getElementById("display").value = result;
}

function sendMessage() {
  const input = document.getElementById("msgInput");
  const message = input.value.trim();
  if (message) {
    const chat = document.getElementById("messages");
    const msgElement = document.createElement("div");
    msgElement.textContent = "You: " + message;
    chat.appendChild(msgElement);
    input.value = "";
  }
}
