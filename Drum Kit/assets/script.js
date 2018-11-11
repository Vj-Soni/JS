console.log("connected");


window.addEventListener('keydown',(e)=>
{
 const audio=document.querySelector(`audio[data-key="${e.keyCode}"]`);
 const key=document.querySelector(`.btns[data-key="${e.keyCode}"]`);
 if(!audio) return; 
 audio.currentTime=0;
 audio.play();
 key.classList.add("clicked");
 setInterval(()=>key.classList.remove("clicked"),500);
 
});