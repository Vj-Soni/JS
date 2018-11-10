console.log("connected");
class uiController{
    constructor(Choice="----",score=[0,0]){
        this.Choice=Choice;
        this.score=score;
        this.updateUi(this.Choice,this.score);

    }

    DomStrings(){
        const rock_Btn=document.querySelector('#R');
        const paper_Btn=document.querySelector('#P');
        const scissor_btn=document.querySelector('#S');
        return [rock_Btn,paper_Btn,scissor_btn];
    }

    updateUi(Choice,score){
        this.Choice=Choice;
        this.score=score;
        document.querySelector(".result").textContent=Choice;
      document.querySelector(".user_score").textContent=this.score[0];
       document.querySelector(".comp_score").textContent=this.score[1];    
    }
   
    
}

class gameController extends uiController{
    Listener(){
        const[rock_Btn,paper_Btn,scissor_btn]=this.DomStrings();
        rock_Btn.addEventListener('click', () =>this.game("r"));
        paper_Btn.addEventListener('click', () =>this.game("p"));
        scissor_btn.addEventListener('click',() =>this.game("s"));
    }

    compChoice(){
        const Choice= Math.floor(Math.random()*3);
        const arr=['r','p','s'];
        return arr[Choice];
    }

    game(userChoice){
        switch(userChoice+this.compChoice()){
            case "rs":
            case "pr":
            case "sp":
                this.score[0]++;
                console.log(this.score);
                this.updateUi("User Wins",this.score);
                break;
            case "rp":
            case "ps":
            case "sr":
                this.score[1]++;
                console.log(this.score);
                this.updateUi("Computer Wins",this.score);
                break;
            case "ss":
            case "rr":
            case "pp":
            console.log(this.score);
                this.updateUi("Draw",this.score);
                break;
            
        }
        
    }
   
}

const gameCntrl=new gameController();
gameCntrl.Listener();
