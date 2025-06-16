let display = document.getElementById('calc-display');

function press(val) {
  if (val === '=') {
    if (display.value === 'AK117') {
      document.querySelector('.calculator').style.display = 'none';
      document.getElementById('chat').style.display = 'block';
    } else {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = 'Error';
      }
    }
  } else {
    display.value += val;
  }
}

function clearDisplay() {
  display.value = '';
}

function sendMessage() {
  const input = document.getElementById('msgInput');
  const msg = input.value.trim();
  if (msg !== '') {
    const div = document.createElement('div');
    div.textContent = `You: ${msg}`;
    document.getElementById('messages').appendChild(div);
    input.value = '';
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
  }
}