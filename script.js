let score = 0;
let maxScore = 8;
let lastLight = null;

const game = document.getElementById("game");
const character = document.getElementById("character");
const overlay = document.getElementById("overlay");
const title = document.getElementById("title");

/* Stars */
for(let i=0;i<120;i++){
    let star=document.createElement("div");
    star.className="star";
    star.style.left=Math.random()*100+"vw";
    star.style.top=Math.random()*100+"vh";
    game.appendChild(star);
}

/* Spawn Light */
function spawnLight(){
    let light=document.createElement("div");
    light.className="light";

    light.style.left=Math.random()*(window.innerWidth-40)+"px";
    light.style.top=Math.random()*(window.innerHeight-250)+"px";

    game.appendChild(light);

    light.addEventListener("pointerdown", function(e){
        e.stopPropagation();
        collectLight(light);
    });
}

/* Collect */
function collectLight(light){

    const rect = light.getBoundingClientRect();
    const pos = {
        x: rect.left + rect.width/2,
        y: rect.top + rect.height/2
    };

    if(lastLight){
        createTrail(lastLight,pos);
    }

    createFlow(pos);

    lastLight = pos;

    light.remove();
    score++;

    character.style.boxShadow = `0 0 ${30+score*10}px #ffd46b`;

    if(score >= maxScore){
        endGame();
    }else{
        spawnLight();
    }
}

/* Trail */
function createTrail(start,end){
    const steps = 25;
    for(let i=0;i<steps;i++){
        let dot=document.createElement("div");
        dot.className="chainTrail";

        dot.style.left = start.x + (end.x-start.x)*(i/steps) + "px";
        dot.style.top  = start.y + (end.y-start.y)*(i/steps) + "px";

        game.appendChild(dot);
        setTimeout(()=>dot.remove(),500);
    }
}

/* Flow */
function createFlow(start){
    const rect = character.getBoundingClientRect();

    const targetX = rect.left + rect.width/2;
    const targetY = rect.top + rect.height/3;

    const flow=document.createElement("div");
    flow.className="flow";
    flow.style.left=start.x+"px";
    flow.style.top=start.y+"px";

    game.appendChild(flow);

    flow.animate([
        {transform:"translate(0,0)",opacity:1},
        {transform:`translate(${targetX-start.x}px,${targetY-start.y}px)`,opacity:0}
    ],{duration:700,easing:"ease-out"});

    setTimeout(()=>flow.remove(),700);
}

/* Ending */
function endGame(){
    title.style.opacity=0;
    setTimeout(()=>overlay.style.opacity=1,800);
}

spawnLight();
