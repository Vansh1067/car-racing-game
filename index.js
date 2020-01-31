const start=document.querySelector('.start');
const gamearea=document.querySelector('.dialog');
const gamearea1=document.querySelector('.dialog1');
const road = document.querySelector('.roadcontent');
const scoreboard = document.querySelector('.scoremsg');
const msg2 =document.querySelector('.scoremsg1');
//let car = document.querySelector('.car');
let gameArea = document.querySelector('.road');

let player={speed:10,score:0}
 

function moveLines(){
    let lines =document.querySelectorAll('.lines');
    lines.forEach((values)=>{
     if(values.y>=600){
        values.y-=1050;
    } 
        values.y+=player.speed;
        values.style.top = values.y+"px";
        
    });
}

function moveEnemy(car){
    let Enemy =document.querySelectorAll('.enemy');
    Enemy.forEach((value)=>{
        if(isColide(car,value)){
            endGame();
        }
     if(value.y>=700){
        value.y=-350;
        value.style.left=Math.floor(Math.random()*487)+"px";
} 
    
        value.y+=player.speed;
        value.style.top = value.y+"px";
        
    });
}
function isColide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right));
}

start.addEventListener('click',Start);
function gamePlay(){
    let Car =road.querySelector('.car');
    let roadc = gameArea.getBoundingClientRect();
    if(player.start){
        moveLines();
        scoreboard.innerHTML="Your Score is: "+ player.score;
        moveEnemy(Car);
        if(keys.ArrowUp && player.y>(roadc.top+100)){
            player.y-=player.speed;
        }
        if(keys.ArrowDown && player.y<(roadc.bottom-80)){
            player.y+=player.speed;
        }
        if(keys.ArrowLeft && player.x>0){
            player.x-=player.speed;
        }
        if(keys.ArrowRight && player.x<(roadc.width-50)){
            player.x+=player.speed;
        }
        Car.style.top = player.y + "px";
        
        Car.style.left = player.x + "px";   
        window.requestAnimationFrame(gamePlay);
        player.score++;
       
    }
    
}

function Start(){
    player.start=true;
    player.score=0;
    road.classList.remove('hide');
    gamearea.classList.add('hide'); 
    scoreboard.classList.remove('hide');
  
    for(z=0;z<4;z++){
        let roadline = document.createElement('div');
        roadline.setAttribute('class','lines');
        roadline.y=(z*150);
        roadline.style.top=roadline.y+"px";
        road.appendChild(roadline);
    }
    let CAR = document.createElement('div');
        CAR.setAttribute('class','car');
        
        road.appendChild(CAR);
        player.x=CAR.offsetLeft;
        player.y=CAR.offsetTop;
    for(z=0;z<4;z++){
            let enemy = document.createElement('div');
            enemy.setAttribute('class','enemy');
            enemy.y=((z+1)*250)*-1;
            enemy.style.top=enemy.y+"px";
            enemy.style.backgroundColor=color();
            enemy.style.left=Math.floor(Math.random()*256)+"px";

            road.appendChild(enemy);
        } 

        window.requestAnimationFrame(gamePlay);
}



function color(){
    function c(){
        let hex = Math.floor(Math.random()*196).toString(16);
        return ("0"+String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();
}
function endGame(){
    player.start=false;
    gamearea1.classList.remove('hide');
    gamearea1.innerHTML=`<p class='start'>GAME OVER</p>
    <p>Your Score is: ${player.score}
    <p class="continue">Click Here To Restart The Game</p>`;
    const Continue =gamearea1.querySelector('.continue');
    Continue.addEventListener('click',startGame);
    gamearea1.classList.remove('hide'); 
}
function startGame(){
    player.score=0;
    road.classList.add('hide');
    gamearea.classList.remove('hide'); 
    gamearea1.classList.add('hide');
    road.innerHTML="";
    scoreboard.innerHTML="";

   
    
}


document.addEventListener('keydown',keydown);
document.addEventListener('keyup',keyup);
function keydown(e){
    e.preventDefault();
    keys[e.key]=true;
    //console.log(e.key);
    //console.log(keys);

}
function keyup(e){
    e.preventDefault();
    keys[e.key]=false;
    //console.log(e.key);
    //console.log(keys)
    
}
let keys={
ArrowUp:false,
ArrowDown:false,
ArrowRight:false,
ArrowLeft:false
}