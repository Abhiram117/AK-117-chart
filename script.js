
function unlockPW(){
  const val=document.getElementById('pwInput').value;
  if(val==='AK117'){hide('pwScreen');show('calcScreen');}else{document.getElementById('pwMsg').innerText='Wrong password!';}
}
let buf="";const disp=()=>document.getElementById('display').textContent=buf||"0";
function key(k){buf+=k;disp();}
function clearDisp(){buf="";disp();}
function back(){buf=buf.slice(0,-1);disp();}
function calc(){try{buf=eval(buf).toString();disp();}catch{buf="";disp();}}
function unlockChat(){
  if(buf==="0720"){hide('calcScreen');show('chatScreen');loadChat();}
  else alert("Wrong calculator code!");
}
function sendMsg(){
  const input=document.getElementById('msgInput');
  if(!input.value.trim())return;
  const div=document.createElement('div');
  div.className='bubble self';
  div.innerHTML=input.value+'<span class="delete" onclick="this.parentElement.remove();saveChat()">🗑️</span>';
  document.getElementById('chatBox').appendChild(div);
  input.value=''; saveChat(); scrollBottom();
}
function sendImg(){
  const file=document.getElementById('imgInput').files[0];
  if(file){
    const reader=new FileReader();
    reader.onload=e=>{
      const div=document.createElement('div');
      div.className='bubble self';
      div.innerHTML='<img src="'+e.target.result+'" class="chatImg"/><span class="delete" onclick="this.parentElement.remove();saveChat()">🗑️</span>';
      document.getElementById('chatBox').appendChild(div);
      saveChat(); scrollBottom();
    };
    reader.readAsDataURL(file);
  }
}
function scrollBottom(){
  const chat=document.getElementById('chatBox');
  chat.scrollTop=chat.scrollHeight;
}
function saveChat(){localStorage.setItem('akchat',document.getElementById('chatBox').innerHTML);}
function loadChat(){const saved=localStorage.getItem('akchat');if(saved)document.getElementById('chatBox').innerHTML=saved;}
function hide(id){document.getElementById(id).style.display='none';}
function show(id){document.getElementById(id).style.display='flex';}
show('pwScreen');
