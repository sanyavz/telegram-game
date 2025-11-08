const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score=0, lives=3, gameRunning=false;

const player={x:canvas.width/2-50, y:canvas.height-220, width:100, height:100, image:new Image()};
const items=[];
const itemImages=['item1.png','item2.png','item3.png','itemBad.png'].map(src=>{ let img=new Image(); img.src='assets/'+src; return img; });

const keys={ArrowLeft:false, ArrowRight:false};
document.addEventListener('keydown', e=>{ if(keys.hasOwnProperty(e.key)) keys[e.key]=true; });
document.addEventListener('keyup', e=>{ if(keys.hasOwnProperty(e.key)) keys[e.key]=false; });

// Экранные кнопки
document.getElementById('leftBtn').addEventListener('touchstart', ()=>{ keys.ArrowLeft=true; });
document.getElementById('leftBtn').addEventListener('touchend', ()=>{ keys.ArrowLeft=false; });
document.getElementById('rightBtn').addEventListener('touchstart', ()=>{ keys.ArrowRight=true; });
document.getElementById('rightBtn').addEventListener('touchend', ()=>{ keys.ArrowRight=false; });

// ==== Предметы ====
function spawnItem(){
    const type=Math.floor(Math.random()*4);
    const baseSize=50;
    const size = type===3? baseSize*2 : baseSize;
    items.push({x:Math.random()*(canvas.width-size), y:-size, width:size, height:size, type:type, image:itemImages[type]});
}

// ==== Обновление ====
function update(){
    if(!gameRunning) return;

    if(keys.ArrowLeft) player.x-=7;
    if(keys.ArrowRight) player.x+=7;
    player.x=Math.max(0,Math.min(player.x,canvas.width-player.width));

    for(let i=0;i<items.length;i++){
        items[i].y+=5/3;
        if(items[i].x<player.x+player.width && items[i].x+items[i].width>player.x &&
           items[i].y<player.y+player.height && items[i].y+items[i].height>player.y){
            if(items[i].type===3) lives--; else score++;
            items.splice(i,1); i--;
        }else if(items[i].y>canvas.height){ items.splice(i,1); i--; }
    }

    if(lives<=0) endGame();
}

// ==== Отрисовка ====
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let item of items) ctx.drawImage(item.image,item.x,item.y,item.width,item.height);
    ctx.drawImage(player.image,player.x,player.y,player.width,player.height);
    ctx.fillStyle='white'; ctx.font='30px Arial';
    ctx.fillText('Очки: '+score,20,40);
    ctx.fillText('Жизни: '+lives,20,80);
}

// ==== Цикл игры ====
function gameLoop(){ update(); draw(); if(gameRunning) requestAnimationFrame(gameLoop); }

// ==== Запуск/Перезапуск ====
function startGame(imageSrc){
    player.image.src='assets/'+imageSrc;
    score=0; lives=3; items.length=0;
    document.getElementById('menu').style.display='none';
    document.getElementById('gameOverScreen').style.display='none';
    gameRunning=true;
    setInterval(spawnItem,1000);
    gameLoop();
}

function endGame(){
    gameRunning=false;
    document.getElementById('finalScore').innerText='Счёт: '+score;
    document.getElementById('gameOverScreen').style.display='flex';
}

function restartGame(){
    document.getElementById('gameOverScreen').style.display='none';
    document.getElementById('menu').style.display='flex';
}
