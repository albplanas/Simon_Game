

var Controller=(function(){
 
    var Turn_on=function(){
        $('#on').css('background','red');
        $('#off').css('background','black');
    }
    var Turn_off=function(){
        $('#off').on('click',function(){
        $('#off').css('background','blue');
        $('#on').css('background','black');
        
            //function for cleaning
           
            $(".board-text").html('');
            //Clear();
        });
    }
   
   
    var flash=function(elem) {
                               setTimeout(function(){
                                   $('#num'+elem).css("border","10px solid");
                                   if(elem==="1"){
                                    var audio = $("#sound1")[0];
                                   }
                                   if(elem==="2"){
                                    var audio = $("#sound2")[0];
                                   }
                                   if(elem==="3"){
                                    var audio = $("#sound3")[0];
                                   }
                                   if(elem==="4"){
                                    var audio = $("#sound4")[0];
                                   }
                                   
                                   audio.play();   
                                },500);
                               setTimeout(function(){$('#num'+elem).css("border","");},1000);
                             }
    
    
    var flash_secuense=function(str){
            cont=0;
            myVar = setInterval(function(){
              if(cont===str.length){
                  cont=0;
                  clearInterval(myVar); 
              }
              else{
              var elem=str.slice(cont,cont+1);
              flash(elem);
              cont++;
              }
             }, 1000);

        
    }                        
                            
    var Sequence_touch=function(str,str1,m,strike){
        $('.container').on('click',function(){
                if(str1!=='')
                {
                    var targ=event.target.id;
                    var num=targ.slice(3,4);
                    str=str+num;
                    console.log(num,'this is the elem',m,str);
                    
                        if(m===str.length){

                            if(m==20){

                             return  setTimeout(Winner(),2000); 
                            }

                             else if(str===str1){
                               return  setTimeout(Round('',"",m+1),5000); 

                            }
                            else if(str!==str1){
                                console.log('diff',strike);
                                Loser();
                                if(strike===true){
                                    return  setTimeout(Round('','',1),5000); 
                                }
                                else{
                                    return  setTimeout(Round('',str1,m),10000); 
                                }
                               
                            }

                        }
                }
                
            });
    }
    
    var Sequence_Random=function(m){
        var str_test='';
        for(i=0;i<m;i++){
            var num=parseInt(Math.random()*4+1+'');
            str_test=str_test+num;
        }   
                   flash_secuense(str_test); 
                   
                        return str_test;

    }
    var  Reproducer_Sequence=function(str1){
        flash_secuense(str1);              
    }
    var Round=function(str,str1,m,strike){
            $(".board-text").html(m);
            console.log('Round00',str1,m);
            if(str1===""){
               
                str1=Sequence_Random(m);
               
            }
            else{
                console.log(str1,"Reproducter");
                Reproducer_Sequence(str1);
            }
            
            console.log('Round',str1,m);
            Sequence_touch(str,str1,m,strike);    
    }



    var Start=function(){

        setTimeout(function(){
            $('#start').css("background","red");
            $(".board-text").html('START');
                            },500);
        setTimeout(function(){
            $('#start').css("background","rgb(145, 48, 48)");
            $(".board-text").html('');                    
                            },1000);
            St=true;
            return St 
                 
                        }                          
    var Strike=function(strike){      
        if(strike===true){
            $('#strike').css("background","DarkBlue ");
            strike=false;
            return strike;
        }
        else{
            console.log('Im here');
            $('#strike').css("background","blue");
            strike=true;
            return strike;
        }                
    }
    var Winner=function(){
        setTimeout(function(){
            $(".board-text").html('Winner');
                            },500);
        setTimeout(function(){
            $(".board-text").html('');                    
                            },1000);
    }
    var Loser=function(){
        setTimeout(function(){
            $(".board-text").html('Mistake');
                            },500);
        setTimeout(function(){
            $(".board-text").html('');                    
                            },1000);
    }
   
   
   
    var Init=function(){
        
            var strike=false;
            var turn=true;
            var St=false;
             Turn_on();
             $('#strike').on('click',function(){
                 strike=Strike(strike);
                 return strike;
                 });
             $('#start').on('click',function(){
                console.log(turn);
                console.log(strike);

            if(turn===true && St===false){
                St=Start();
                setTimeout(function(){
                    Round("","",1,strike);
                                    },1000);
            }
                
            });

            $('#off').on('click',function(){
                console.log(turn);
                turn=false; 
                return turn;
            });
            $('#on').on('click',function(){
                console.log(turn);
                turn=true; 
                return turn;
            });
        
        
    }


        return{
            get_Init:function(){
                Init();
            },
            get_Off:function(){
                Turn_off();
            },
            get_flash_sec:function(){
                return flash_secuense('123');
            }
        }  
  }());






$(document).ready(function() {
    $('#on').on('click',function(){

       Controller.get_Init();
       Controller.get_Off();
     });
    
}); 
