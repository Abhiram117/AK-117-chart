/****************  VIEW FLOW  ****************/
const pwView  = document.getElementById('passwordView');
const calcView= document.getElementById('calcView');
const chatView= document.getElementById('chatView');
pwView.style.display='flex';         // show first view

/*************** 1. PASSWORD ***************/
let tries = 0, waitUntil = 0;
function unlockPW(){
  const now=Date.now();
  if(now<waitUntil){pwMsg.textContent='Wait…';return;}
  if(pw.value.trim()==='AK117'){
    pwView.style.display='none'; calcView.style.display='flex';
  }else{
    tries++; pwMsg.textContent='Wrong';
    if(tries>=5){waitUntil=now+30000; pwMsg.textContent='Locked 30s';}
  }
}

/*************** 2. CALCULATOR ***************/
const display = document.getElementById('calcDisplay');
const btnWrap = document.getElementById('btns');
const keys=['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+','AC','⌫'];
let expr='';
keys.forEach(k=>{const b=document.createElement('button');b.textContent=k;b.onclick=()=>press(k);btnWrap.appendChild(b);});
function press(k){if(k==='AC')expr='';else if(k==='⌫')expr=expr.slice(0,-1);else if(k==='='){try{expr=eval(expr).toString();}catch{expr='Err';}}else expr+=k;display.textContent=expr||'0';}
function checkCalc(){if(expr==='0720'){calcView.style.display='none';chatView.style.display='flex';loadChat();}else calcMsg.textContent='Wrong code';}

/*************** 3. CHAT ***************/
const chatBox=document.getElementById('chatBox'),input=document.getElementById('chatInput');

function addBubble(html){const d=document.createElement('div');d.className='bubble me';d.innerHTML=html+' <span class="deleteBtn" onclick="this.parentElement.remove();saveChat()">x</span>';chatBox.appendChild(d);chatBox.scrollTop=chatBox.scrollHeight;saveChat();}
function sendMsg(){if(!input.value.trim())return;addBubble(input.value);input.value='';}

function sendImg(el){const f=el.files[0];if(!f)return;const r=new FileReader();r.onload=e=>addBubble('<img src="'+e.target.result+'">');r.readAsDataURL(f);}

function startVoice(){if(!('webkitSpeechRecognition'in window))return alert('No speech-to-text');const rec=new webkitSpeechRecognition();rec.lang='en-IN';rec.start();rec.onresult=e=>input.value=e.results[0][0].transcript;}

function recordVoice(){navigator.mediaDevices.getUserMedia({audio:true}).then(st=>{const mr=new MediaRecorder(st);let ch=[];mr.ondataavailable=e=>ch.push(e.data);mr.onstop=()=>{const url=URL.createObjectURL(new Blob(ch,{type:'audio/ogg'}));addBubble('<audio controls src="'+url+'"></audio>');};mr.start();setTimeout(()=>mr.stop(),5000);});}

/*************** 4. storage ***************/
function saveChat(){localStorage.setItem('ak117_history',chatBox.innerHTML);}
function loadChat(){const s=localStorage.getItem('ak117_history');if(s)chatBox.innerHTML=s;chatBox.scrollTop=chatBox.scrollHeight;}
