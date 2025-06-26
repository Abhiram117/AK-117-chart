
// --- PIN & Lock ----
let fails=0,lockUntil=0;
function unlock(){const v=pinInput.value.trim(),n=Date.now();if(v==='117'){lockScreen.style.display='none';calcScreen.style.display='block';pinInput.value='';fails=0;return;}
if(n<lockUntil){lockMsg.textContent='Locked '+Math.ceil((lockUntil-n)/1000)+'s';return;}
fails++;if(fails>=5){lockUntil=n+30000;lockMsg.textContent='Locked 30s';}else{lockMsg.textContent='Wrong! attempts left '+(5-fails);}}

// ---- Calculator ----
let expr='';
function press(v){if(v==='AC'){expr='';}else if(v==='DEL'){expr=expr.slice(0,-1);}else if(v==='+/-'){if(expr.startsWith('-'))expr=expr.slice(1);else expr='-'+expr;}else expr+=v;
calcDisplay.value=expr||0;}
function calcEquals(){try{expr=eval(expr).toString();}catch{expr='Err';}calcDisplay.value=expr;}

// --- Chat (local only) ----
const chatBox=document.getElementById('chatBox');
const myName=localStorage.getItem('chatName')||prompt('Enter nickname');localStorage.setItem('chatName',myName);
function addMsg(name,html,cls){const d=document.createElement('div');d.className='msg '+cls;d.innerHTML=html+'<span class="del" onclick="this.parentElement.remove()">🗑️</span>';chatBox.appendChild(d);chatBox.scrollTop=chatBox.scrollHeight;}
function sendMsg(){const t=chatInput.value.trim();if(!t)return;addMsg(myName,t,'self');chatInput.value='';save();}
function sendImg(e){const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=ev=>{addMsg(myName,'<img src="'+ev.target.result+'">','self');save();};r.readAsDataURL(file);}
function backToCalc(){chatScreen.style.display='none';calcScreen.style.display='block';}
function openChat(){calcScreen.style.display='none';chatScreen.style.display='flex';load();}
// storage
function save(){localStorage.setItem('ak117_chat',chatBox.innerHTML);}function load(){chatBox.innerHTML=localStorage.getItem('ak117_chat')||'';chatBox.scrollTop=chatBox.scrollHeight;}

// --- Voice record to audio blob ----
let mediaRec,chunk=[],rec=false;
function toggleRecord(){
 if(!navigator.mediaDevices){alert('No mic');return;}
 if(!rec){navigator.mediaDevices.getUserMedia({audio:true}).then(s=>{mediaRec=new MediaRecorder(s);mediaRec.start();chunk=[];mediaRec.ondataavailable=e=>chunk.push(e.data);mediaRec.onstop=()=>{const blob=new Blob(chunk,{type:'audio/webm'});const url=URL.createObjectURL(blob);addMsg(myName,'<audio controls src="'+url+'"></audio>','self');save();};rec=true;micBtn.textContent='⏹️';});}
 else{mediaRec.stop();rec=false;micBtn.textContent='🎤';}
}
