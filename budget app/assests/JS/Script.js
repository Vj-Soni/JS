console.log("connected");
var budgetController = (function(){
   
    var Expense = function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
        this.percentage= -1;
    }

    var Income = function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    }

    Expense.prototype.calcPercent= function(totalIncome){
        if(totalIncome>0)
        this.percentage = Math.round((this.value/totalIncome)*100);
        else
        this.percentage=-1;
    };

    Expense.prototype.getPercent=function(){
        return this.percentage;
    };

    // var allExp=[];
    // var allInc=[];
    // var totalExp,totalInc
    // var total = {
    //         inc:0,
    //         exp:0
    //     }

    var calcTotal= function(type){
        var sum=0;
        data.allItems[type].forEach(function(cur){
            sum+=cur.value;
        });
        data.totals[type]=sum;
    };

     var data = {
         allItems:{
            exp:[],
            inc:[] 
         },
         totals:{
            inc:0,
            exp:0
         },
         budget: 0,
         percentage:-1,
            }

            return{
                addItem:function(type,des,val){
                    var newItem,ID;
                    if(data.allItems[type].length>0)
                    ID=data.allItems[type][data.allItems[type].length-1].id+1;
                    else
                    ID=0;

                    if(type==="exp") newItem=new Expense(ID,des,val);
                    else if(type==="inc") newItem=new Income(ID,des,val);


                    data.allItems[type].push(newItem);

                    return newItem;
                },

                deleteItem:function(type,id){
                    var ids,index,i;
                    ids= data.allItems[type].map(function(cur){
                        return cur.id;
                    });
                     
                    index= ids.indexOf(id);
                    if(index !== -1){
                        data.allItems[type].splice(index,1);
                    }

                },
                
                calculateBudget:function(){
                    //inc and exp calc
                    calcTotal('inc'); 
                    calcTotal('exp');
                    //budget calc
                    data.budget= data.totals.inc-data.totals.exp;
                    //percentage calc
                    if(data.totals.inc>0 && data.totals.inc>data.totals.exp)
                    data.percentage= Math.round((data.totals.exp/data.totals.inc)*100);
                    else
                    data.percentage=-1;
                
                },

                calculatePercentages: function(){
                    data.allItems.exp.forEach(function(cur){
                        cur.calcPercent(data.totals.inc);
                    });

                },

                getPercentages: function(){
                    var allPercent=data.allItems.exp.map(function(cur){
                        return cur.getPercent();
                    });
                    return allPercent;
                },

                getBudget: function(){
                    return{
                        budget: data.budget,
                        totalInc: data.totals.inc,
                        totalExp: data.totals.exp,
                        percentage: data.percentage,
                    }
                },



                test:function(){
                    console.log(data);
                }
            }

})();

var uiController = (function(){

    var DomStrings={
            inputType: document.querySelector('.add__type'),
            inputValue: document.querySelector('.add__value'),
            inputDescription: document.querySelector('.add__description'),
            inputbtn: document.querySelector('.add__btn'),
            container: document.querySelector('.lower'),
            budgetLabel: document.querySelector('.upper h3'),
            incLabel: document.querySelector('.middle .inc .amt'),
            expLabel: document.querySelector('.middle .exp .amt'),
            percentLabel: document.querySelector('.percent'),
            expPercentLabel: '.item-percent',
            dateLabel: document.querySelector('.upper .title_date'), 
           
            };

          var  formatNumber= function(num,type){
                var numSplit,int,float;
                num=Math.abs(num);
                num=num.toFixed(2);
                numSplit=num.split('.');
    
                int=numSplit[0];
                if(int.length>3){
                    int=int.substr(0,int.length-3)+','+int.substr(int.length-3,3);
                }
    
                float=numSplit[1];
                return int+'.'+float;
            };

          var nodeListForEach=function(list,callback){
                for(var i=0;i<list.length;i++){
                    callback(list[i],i);
                };
            };

      return{
          //get values form input field
          getInput:function(){
            console.log("getting input....");
              return{
                    type : DomStrings.inputType.value,
                    description : DomStrings.inputDescription.value,
                    value : parseFloat(DomStrings.inputValue.value)
              }; 
              
        },

        addListItem: function(dataObj,type){
            var html,newHtml;
                //html string
                if(type==='inc')
                    html= '<div class="income-item" id="inc-%id%"><div class="item-description">%description%<p class="date">november 16 2018</p></div><div class="item-left"><div class="item-value"><i class="fas fa-long-arrow-alt-up fa-xs"></i>%value%</div><button class="item-delete"><i class="far fa-times-circle fa-lg"></i></button></div>  </div>'
                else if(type==='exp')
                    html='<div class="expense-item" id="exp-%id%"><div class="item-description">%description%<p class="date">november 16 2018</p></div><div class="item-left"><div class="item-value"><i class="fas fa-long-arrow-alt-down fa-xs"></i>%value%</div><span class="item-percent">2%</span><button class="item-delete"><i class="far fa-times-circle fa-lg"></i></button></div>  </div>'

                    //placing value in strings
                    console.log("replacing...");
                    newHtml=html.replace("%id%",dataObj.id);
                    newHtml=newHtml.replace("%description%",dataObj.description);
                    newHtml=newHtml.replace("%value%",formatNumber(dataObj.value,type));
                    //Inserting in DOM
                    console.log("inserting to DOM");
                    DomStrings.container.insertAdjacentHTML('beforeend',newHtml);


        },

        deleteListItem: function(SelectorID){
            var el=document.getElementById(SelectorID);
            el.parentNode.removeChild(el);

        },

        clearFields: function(){
            var fields=[];
            // fields=document.querySelectorAll(DomStrings.inputDescription+','+DomStrings.inputValue);
            // Array.prototype.slice.call(fields);
            fields[0]=DomStrings.inputDescription;
            fields[1]=DomStrings.inputValue;
            fields.forEach(function(cur,i,arr){
                cur.value="";
                //
            });
            fields[0].focus();
        },

        displayBudget: function(obj){
            DomStrings.budgetLabel.textContent=obj.budget;
            DomStrings.incLabel.textContent=obj.totalInc;
            DomStrings.expLabel.textContent= obj.totalExp;
             if(obj.percentage>0)
                DomStrings.percentLabel.textContent= obj.percentage+ "% ";
             else
                DomStrings.percentLabel.textContent= "---";

        },

        displayPercentages:function(percentages){
            var fields=document.querySelectorAll(DomStrings.expPercentLabel);
           
            console.log(fields);  
            nodeListForEach(fields,function(cur,i){
                
                if(percentages[i]>0)
                cur.textContent=percentages[i]+'%';
                else
                cur.textContent="---";
            });

        },

        displayDate:function(){
            var now,mL,mS,month,fields,day,year;
            now=new Date(); 
            mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            month=now.getMonth();
            day=now.getDate();
            year=now.getFullYear();
            fields=document.querySelectorAll('.date');
             nodeListForEach(fields,function(cur){
                     cur.textContent=mS[month]+" "+day+" "+year;
             });
            DomStrings.dateLabel.textContent=mL[month];
            
        },

        changeType: function(){
             var fields=document.querySelectorAll(
                 'add__type , .add__description ,.add__value '
             );

             nodeListForEach(fields,function(cur){
                cur.classList.toggle('focus');
             });
             DomStrings.inputbtn.classList.toggle('btn-focus');


        },

    
            //make strings public 
            getDomStrings:function(){
                return DomStrings;
            }
      };
         
        
    
})();

var Controller = (function(budgetCntrl,uiCntrl){

    var listeners = function(){
        var DOM = uiCntrl.getDomStrings();
        
        DOM.inputbtn.addEventListener('click',cntrlAddItem);
            document.addEventListener('keypress',function(e){
                if(e.keyCode===13||e.which===13)
                cntrlAddItem();
            });
            DOM.container.addEventListener('click',cntrlDeleteItem);
            DOM.inputType.addEventListener('change',uiCntrl.changeType);
    };

    

    var updateBudget= function(){
        //all calc of budget ,inc, exp
        budgetCntrl.calculateBudget();
        var budget= budgetCntrl.getBudget();
        console.log(budget);
        uiCntrl.displayBudget(budget);
    };

    var updatePercent= function(){
        //calc percent
        budgetCntrl.calculatePercentages();
        //read percent from th bdtcntrl
        var percentages=budgetCntrl.getPercentages();
        //update ui with percent
        uiCntrl.displayPercentages(percentages);

        console.log(percentages);
    }
  
     var cntrlAddItem = function(){
            //get input field data
            var input=uiCntrl.getInput();
                console.log(input);
                
            if(input.description!=""&&!isNaN(input.value)&&input.value>0){
                
                // add item to the budgetcntrller
                    var newItem=budgetCntrl.addItem(input.type,input.description,input.value);
                    // add item to the ui
                    console.log("addlistitem");
                    uiCntrl.addListItem(newItem,input.type);
                    //clear fields 
                    uiCntrl.clearFields();
                    // calc the budget
                    updateBudget();
                    // displayin ui
                    //date of cards
                    uiCntrl.displayDate();
                    //calc nd update percent
                    updatePercent();
            }
            
           
        };

        var cntrlDeleteItem= function(e){
            var itemID,splitID,type,ID;
            //traversing dom for id
            itemID=e.target.parentNode.parentNode.parentNode.id;

            if(itemID){
                splitID= itemID.split('-');
                type=splitID[0];
                ID=parseInt(splitID[1]);
                //del from data
                budgetCntrl.deleteItem(type,ID);
                //del from ui
                uiCntrl.deleteListItem(itemID);
                //upadate and show budget
                updateBudget();
                //updateing percent
                updatePercent();
            }
        };
    

            return{
                init:function(){
                    console.log("Application is listening");
                    uiCntrl.displayDate();
                    uiCntrl.displayBudget({
                         budget: 0,
                         totalInc: "_",
                         totalExp: "_",
                         percentage: -1,
                     })
                    listeners();
                }
            }
    
    

})(budgetController,uiController);

Controller.init();