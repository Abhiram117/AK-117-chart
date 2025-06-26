/******************  PIN & CALCULATOR  ******************/
let failCount = 0;
let lockTime  = 0;

function checkPassword() {
  const input = document.getElementById("passwordInput").value.trim();
  const now   = Date.now();

  if (input === "AK117") {
    document.getElementById("passwordScreen").style.display = "none";
    document.getElementById("calculator").style.display    = "block";
    return;
  }

  if (now < lockTime) {
    document.getElementById("lockMessage").textContent =
      "Locked " + Math.ceil((lockTime - now) / 1000) + " s";
    return;
  }

  failCount++;
  if (failCount >= 5) {
    lockTime = now + 30_000;
    document.getElementById("lockMessage").textContent =
      "Too many tries! Wait 30 s";
    setTimeout(() => (document.getElementById("lockMessage").textContent = ""), 30_000);
  } else {
    document.getElementById("lockMessage").textContent =
      "Wrong PIN – tries left " + (5 - failCount);
  }
}

/* ----- calculator buttons ----- */
let expr = "";
function press(v) {
  if (v === "AC") expr = "";
  else if (v === "⌫") expr = expr.slice(0, -1);
  else expr += v;
  document.getElementById("calcDisplay").textContent = expr || "0";
}
function calculate() {
  try { expr = eval(expr).toString(); }
  catch { expr = "Err"; }
  document.getElementById("calcDisplay").textContent = expr;
}
function clearDisplay() { expr = ""; document.getElementById("calcDisplay").textContent = "0"; }
function backspace()    { press("⌫"); }
function showChat()     {
  document.getElementById("calculator").style.display = "none";
  document.getElementById("chatScreen").style.display = "flex";
  loadChat();         // ← restore chat history when chat opens
}

/******************  CHAT FUNCTIONS  ******************/
const chatBox = document.getElementById("chatBox");

/* ========== 1. local-storage helpers ========== */
function saveChat() {
  localStorage.setItem("ak117_history", chatBox.innerHTML);
}
function loadChat() {
  const saved = localStorage.getItem("ak117_history");
  if (saved) chatBox.innerHTML = saved;
  chatBox.scrollTop = chatBox.scrollHeight;
}
function clearChat() {               // (optional helper)
  localStorage.removeItem("ak117_history");
  chatBox.innerHTML = "";
}

/* ========== 2. text message ========== */
function sendMessage() {
  const input = document.getElementById("chatInput");
  const txt   = input.value.trim();
  if (!txt) return;

  const msg = document.createElement("div");
  msg.className = "message self";
  msg.innerHTML =
    txt +
    ' <span class="delete-btn" onclick="this.parentElement.remove(); saveChat();">🗑️</span>';
  chatBox.appendChild(msg);

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
  saveChat();
}

/* ========== 3. image ========== */
function sendImage(fileInput) {
  const file = fileInput.files[0];
  if (!file || !file.type.startsWith("image/")) return;

  const reader = new FileReader();
  reader.onload = e => {
    const msg = document.createElement("div");
    msg.className = "message self";
    msg.innerHTML =
      '<img src="' +
      e.target.result +
      '" style="max-width:200px;border-radius:10px;" />' +
      ' <span class="delete-btn" onclick="this.parentElement.remove(); saveChat();">🗑️</span>';
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
    saveChat();
  };
  reader.readAsDataURL(file);
}

/* ========== 4. speech-to-text ========== */
function startVoice() {
  if (!("webkitSpeechRecognition" in window))
    return alert("Speech-to-text not supported");

  const rec = new webkitSpeechRecognition();
  rec.lang = "en-IN";
  rec.start();
  rec.onresult = e => (document.getElementById("chatInput").value = e.results[0][0].transcript);
}

/* ========== 5. voice recorder (5-second clip) ========== */
function recordVoice() {
  const player = document.getElementById("voicePlayback");
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    const mr     = new MediaRecorder(stream);
    const chunks = [];
    mr.ondataavailable = e => chunks.push(e.data);
    mr.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
      const url  = URL.createObjectURL(blob);

      const msg = document.createElement("div");
      msg.className = "message self";
      msg.innerHTML =
        '<audio controls src="' +
        url +
        '"></audio> <span class="delete-btn" onclick="this.parentElement.remove(); saveChat();">🗑️</span>';
      chatBox.appendChild(msg);
      chatBox.scrollTop = chatBox.scrollHeight;
      saveChat();
    };
    mr.start();
    setTimeout(() => mr.stop(), 5000); // 5-second record
  });
}

/* ========== 6. translator stub ========== */
function translateMessage() {
  const input = document.getElementById("chatInput");
  const map = {
    thinava: "Did you eat?",
    vachava: "Did you come?",
    cheppava: "Did you say?",
    ekkadunnav: "Where are you?",
    "em chestunnav": "What are you doing?",
    lekapote: "Otherwise / If not"
  };
  const low = input.value.toLowerCase();
  for (const key in map) if (low.includes(key)) return (input.value = map[key]);
}

/* ========== 7. load history on first page load ========== */
window.onload = () => loadChat();

