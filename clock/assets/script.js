const hoursHand = document.querySelector(".hour-hand");
const minHand = document.querySelector(".min-hand");
const secHand = document.querySelector(".sec-hand");

function clock(){
    const now = new Date();
    const seconds = now.getSeconds();
    const secondDeg = ((seconds/60)*360)+90;
    secHand.style.transform=`rotate(${secondDeg}deg)`;
    const min = now.getMinutes();
    const minDeg = ((min/60)*360)+((seconds/60)*6)+90;
    minHand.style.transform = `rotate(${minDeg}deg)`;
    const hour = now.getHours();
    const hourDeg = ((hour/12)*360)+((min/60)*30)+90;
    hoursHand.style.transform = `rotate(${hourDeg}deg)`;
}
setInterval(clock,1000);
