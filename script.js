
function unlockPW(){
  if(document.getElementById('pwInput').value==='AK117'){
    hide('pwScreen'); show('calcScreen');
  }else{document.getElementById('pwMsg').textContent='Wrong password';}
}
let buf="";
const disp=()=>document.getElementById('display').textContent=buf||"0";
function key(k){buf+=k;disp();}
function clearDisp(){buf="";disp();}
function back(){buf=buf.slice(0,-1);disp();}
function calc(){try{buf=eval(buf).toString();disp();}catch{buf="";disp();}}
function unlockChat(){
  if(buf==="0720"){hide('calcScreen');show('chatScreen');loadChat();}
  else alert('Wrong code');
}
function sendMsg(){
  const inp=document.getElementById('msgInput');
  if(!inp.value.trim())return;
  addBubble(inp.value.trim(),'self'); inp.value=''; saveChat();
}
function sendImg(){
  const file=document.getElementById('imgInput').files[0];
  if(!file)return;
  const fr=new FileReader();
  fr.onload=e=>{addBubble('<img src="'+e.target.result+'" class="chatImg">','self'); saveChat();}
  fr.readAsDataURL(file);
}
function addBubble(html,cls){
  const div=document.createElement('div');div.className='bubble '+cls;div.innerHTML=html;
  const box=document.getElementById('chatBox');box.appendChild(div);box.scrollTop = box.scrollHeight;
}
function saveChat(){localStorage.setItem('akchat',document.getElementById('chatBox').innerHTML);}
function loadChat(){const saved=localStorage.getItem('akchat');if(saved)document.getElementById('chatBox').innerHTML=saved;}
function hide(id){document.getElementById(id).style.display='none';}
function show(id){document.getElementById(id).style.display='flex';}
show('pwScreen');
