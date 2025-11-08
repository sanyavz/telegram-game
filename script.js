const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let score = 0;
const player = {x: canvas.width/2-50, y: canvas.height-120, width:100, height:100, image:new Image()};
player.image.src = 'assets/player.png';
const items=[];
const itemImage = new Image(); itemImage.src='assets/item1.png';
function spawnItem(){items.push({x:Math.random()*(canvas.width-50),y:-50,width:50,height:50,image:itemImage});}
let touchX=null;
canvas.addEventListener('touchmove',(e)=>{touchX=e.touches[0].clientX;});
function update(){if(touchX!==null){player.x=touchX-player.width/2;}for(let i=0;i<items.length;i++){items[i].y+=5;if(items[i].x<player.x+player.width&&items[i].x+items[i].width>player.x&&items[i].y<player.y+player.height&&items[i].y+items[i].height>player.y){score++;items.splice(i,1);i--;}else if(items[i].y>canvas.height){items.splice(i,1);i--;}}}
function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.drawImage(player.image,player.x,player.y,player.width,player.height);for(let item of items){ctx.drawImage(item.image,item.x,item.y,item.width,item.height);}ctx.fillStyle='white';ctx.font='30px Arial';ctx.fillText('Очки: '+score,20,40);}
function gameLoop(){update();draw();requestAnimationFrame(gameLoop);}
setInterval(spawnItem,1000);
gameLoop();