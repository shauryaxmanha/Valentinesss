const btnNo=document.getElementById('btnNo');
const btnYes=document.getElementById('btnYes');
const noMessage=document.getElementById('noMessage');

btnNo.addEventListener('mouseenter',()=>{
  btnNo.style.position='absolute';
  btnNo.style.left=Math.random()*80+'%';
  btnNo.style.top=Math.random()*80+'%';
  noMessage.textContent='Wrong answer 😌';
});

btnYes.addEventListener('click',()=>{
  alert('YAY!!! 💖');
});
