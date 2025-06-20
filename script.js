
function checkPassword() {
    const input = document.getElementById("passwordInput").value;
    if (input === "117") {
        document.getElementById("passwordScreen").style.display = "none";
        document.getElementById("calculator").style.display = "block";
    } else {
        alert("Wrong PIN! Try again.");
    }
}
let current = "";
function press(value) {
    current += value;
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
    document.getElementById("chatScreen").style.display = "block";
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
    }
}
