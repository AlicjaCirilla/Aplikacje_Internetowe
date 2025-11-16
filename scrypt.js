function draw(elementID, bool1) {
    Element1 =document.getElementById(elementID);
    Element1.innerHTML="";
    console.log("Function draw")
    for (let i = 0; i < 4; i++) {
        var rows=document.createElement("div");
        rows.setAttribute("id","row")
        rows.setAttribute("data-index", i)
        for (let j=0;j<4;j++){
            const piece= document.createElement("img");
            piece.setAttribute("class", "puzzleElement")
            piece.setAttribute("draggable", "true")
            piece.setAttribute("data-index",i*4+j);
            rows.appendChild(piece)
        }
        Element1.appendChild(rows);
    }
}

function SplitImage(){
        canvaspace=document.getElementById("dupa");
        var ImagePieces=[];
        var widthofonepiece=100, heightofonepiece=100;
        for(let x=0;x<4;x++){
            for(let y=0;y<4;y++){
                var canvas1= document.createElement('canvas');
                canvas1.width= widthofonepiece;
                canvas1.height=heightofonepiece;
                var context= canvas1.getContext('2d');
                context.drawImage(canvaspace, x*widthofonepiece,y*heightofonepiece,widthofonepiece,heightofonepiece,0,0,canvas1.width,canvas1.height)
                ImagePieces.push(canvas1.toDataURL());
            }
        }
    return ImagePieces;
}
function fillPuzzle(ImagePieces){
    let PuzzlePieces=document.querySelectorAll(".puzzleElement");
    let currentIndex = ImagePieces.length;
    puzzleIndex=[];
    puzzleIndex.length=16
    for(let i=1;i<17;i++){
        puzzleIndex[i]=i;
    }
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [ImagePieces[currentIndex], ImagePieces[randomIndex]] = [
      ImagePieces[randomIndex], ImagePieces[currentIndex]];
    [puzzleIndex[currentIndex], puzzleIndex[randomIndex]] = [
      puzzleIndex[randomIndex], puzzleIndex[currentIndex]];
  }
    for(let x=0;x<4;x++){
            for(let y=0;y<4;y++){
                var item=PuzzlePieces[y*4+x];
                item.src= ImagePieces[x*4+y];
                item.setAttribute("data-index", puzzleIndex[x*4+y]);
            }
        }
    let PuzzleB = Array.from(PuzzlePieces).slice(16, 32);
        for(let x=0;x<4;x++){
            for(let y=0;y<4;y++){
                var item=PuzzleB[x*4+y];
                item.src= "space1.png";
            }
        }
}
function drawEvents(){
    let PuzzleB = document.querySelectorAll("#puzzle2 .puzzleElement");
    PuzzleB.forEach(item => {
    item.addEventListener("dragover", DragOver);
    item.addEventListener("drop", DropHandler);
});
let PuzzleA = document.querySelectorAll("#puzzle1 .puzzleElement");
PuzzleA.forEach(item => {
    item.addEventListener("dragstart", DragStart);
});
}

function DragStart(ev){
    ev.dataTransfer.setData("index", ev.target.dataset.index);
}
function DragOver(ev){
     ev.preventDefault();
}
function DropHandler(ev){
    ev.preventDefault();
    const index=ev.dataTransfer.getData("index");
    const dr1 = document.querySelector(`[data-index="${index}"]`);
    console.log(dr1.src)
    console.log(ev.target.src)
    const tmp=ev.target.src;
    const tmpIndex=ev.target.getAttribute("data-index");
    ev.target.src=dr1.src;
    ev.target.setAttribute("data-index",dr1.getAttribute("data-index"));
    dr1.src=tmp;
    dr1.setAttribute("data-index",tmpIndex);
    PuzzleChecker();
}
function PuzzleChecker(){
    let PuzzlePieces=document.querySelectorAll(".puzzleElement");
    let PuzzleB = Array.from(PuzzlePieces).slice(16, 32);
    for(let x=1;x<17;x++){
        let item=PuzzlePieces[x];
        if(item.getAttribute("data-index")!=x){
            console.log("fail");
            return;}
        }
    console.log("success!");
}
var map;
function success(pos) {
    const crd = pos.coords;
    console.log("Your position:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude : ${crd.longitude}`);
    map = L.map('map').setView([crd.latitude, crd.longitude], 13, preferCanvas = true);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

}
function loadImage(){
    const canva = document.getElementById("dupa");
    const context = canva.getContext('2d');

    leafletImage(map, function(err, fullCanvas) {
    context.canvas.width = fullCanvas.width;
    context.canvas.height = fullCanvas.height;
    context.drawImage(fullCanvas, 0, 0);
    ImagePieces= SplitImage()
    fillPuzzle(ImagePieces);
});

}

function getLocation(){
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(success, error);
    else
        alert("Geolocation is not supported by this browser.");
}
function error(err){
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

function handleSend(){
        if(!("Notification" in window)){
            alert("Not supported");
            return;
        }
        Notification.requestPermission().then(permition=>{
            if(permition==="granted"){
                const notif= new Notification("Allow to find your location")
                notif.onclick=()=>{
                    getLocation();
                }
            }
        })
}
//SystemNotif();
getLocation();
draw("puzzle1", true);
draw("puzzle2", false);
drawEvents();