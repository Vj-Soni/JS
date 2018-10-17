var pickColor,easy;
var arr1=[];
var circles=document.querySelectorAll(".circle");
var randomColors=randomcolors(38);



init();

function init(){
	show();
	for (var i = 0; i < circles.length; i++) {
		arr1[i]=i;
		circles[i].style.background=randomColors[i];
		circles[i].addEventListener('click',function(){
		 	var select=this.style.background;
		 	if(select===pickColor){
		 		show();
		 		document.querySelector("span").style.color=pickColor;
		 		for (var i = 0; i < circles.length; i++) {
		 			circles[i].style.background=pickColor;
		 		}
		 	}
		 	else{
		 		this.style.opacity='0';
		 		this.style.visibility='hidden';
		 	}
		 })
		}
}


//mode generator
var modes=document.querySelectorAll(".mode")

for (var i = 0; i < modes.length; i++) {
	modes[i].addEventListener('click',function(){
			modes[0].classList.remove('active');
			modes[1].classList.remove('active');
			modes[2].classList.remove('active');
			modes[3].classList.remove('active');
			modes[4].classList.remove('active');
			this.classList.add('active');
			document.querySelector("span").style.color='#000';
			if(this.textContent==="very easy"){
				circlesNum=3;
			}else if(this.textContent==="easy"){
				circlesNum=6;
			}else if(this.textContent==="hard"){
				circlesNum=11;
			}else if(this.textContent==="very hard"){
				circlesNum=17;
			}else {
				circlesNum=250;
			}


			arr1=[];
				blank();		
				randomColors=randomcolors(circlesNum);

		for (var i = 0; i < circlesNum; i++) {
			easy=Math.floor(Math.random()*circles.length);
			arr1.push(easy);
			circles[easy].style.background=randomColors[i];
			circles[easy].style.opacity="0.9";
			circles[easy].style.visibility="visible";
					}
				
				pickColor=pickedColor(circlesNum); 
		})
	
}


//generate random color
function randomcolors(num){
	var ar=[];
	for (var i = 0; i < num; i++) {
	var r=Math.floor(Math.random()*256);
	var g=Math.floor(Math.random()*256);
	var b=Math.floor(Math.random()*256);

	ar.push("rgb(" +r + ", " + g + ", " +b +")");
	}

	return ar;
}



//randomly selected color
function pickedColor(num){
	var pickedColor=Math.floor(Math.random()*num);
	var color=circles[arr1[pickedColor]].style.background;
	document.querySelector("span").textContent=color;
		return color;
}  pickColor=pickedColor(38); 


//hide all circles
function blank(){
	for(var i=0;i<circles.length;i++){
		circles[i].style.opacity="0";
		circles[i].style.visibility="hidden";
	}

}
//show all circles
function show(){
	for(var i=0;i<circles.length;i++){
		circles[i].style.opacity="0.9";
		circles[i].style.visibility="visible";
	}

}

