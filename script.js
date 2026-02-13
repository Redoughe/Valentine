let score = 0;
let maxScore = 6;

const game = document.getElementById("game");
const character = document.getElementById("character");
const overlay = document.getElementById("overlay");
const title = document.getElementById("title");

/* Pesan progres */
const messages = [
    "Se plenger apapun kita",
    "Se absurd apapun kita",
    "Kita tetap kita❤️",
    "Ikan hiu di atas genteng",
    "Love you seng😘"
];

/* Buat elemen pesan */
const messageBox = document.createElement("div");
messageBox.style.position = "absolute";
messageBox.style.top = "25%";
messageBox.style.width = "100%";
messageBox.style.textAlign = "center";
messageBox.style.color = "white";
messageBox.style.fontSize = "18px";
messageBox.style.opacity = "0";
messageBox.style.transition = "opacity 1s";
messageBox.style.pointerEvents = "none";
messageBox.style.zIndex = "6";

game.appendChild(messageBox);

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

    createFlow(pos);

    light.remove();
    score++;

    showMessage(score-1);

    character.style.boxShadow = `0 0 ${30+score*12}px #ffd46b`;

    if(score >= maxScore){
        endGame();
    }else{
        spawnLight();
    }
}

/* Flow ke karakter */
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

/* Tampilkan pesan */
function showMessage(index){
    if(messages[index]){
        messageBox.textContent = messages[index];
        messageBox.style.opacity = "1";

        setTimeout(()=>{
            messageBox.style.opacity = "0";
        },2500);
    }
}

/* Ending cinematic */
function endGame(){
    title.style.opacity=0;
    messageBox.style.opacity=0;

    setTimeout(()=>{
        overlay.innerHTML = `
            Bagaimanapun keadaannya<br><br>
            I will fight for us seng,<br>
            Makasih sudah mau nerima aku.<br><br>
            Happy Valentine sengku🤍
        `;
        overlay.style.opacity=1;
    },1000);
}

spawnLight();


