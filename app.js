const canvas = document.getElementById("jsCanvas"),
    ctx = canvas.getContext("2d"),
    colors = document.getElementsByClassName("controls_color"),
    range = document.querySelector(".controls_range"),
    mode = document.getElementById("jsMode"),
    saveBtn = document.getElementById("jsSave"),
    lineBtn = document.getElementById("jsLine");

canvas.width = 630;
canvas.height = 540;

ctx.strokeStyle = "#2c2c2";
ctx.lineWidth = 4;
ctx.fillStyle = "white";

let painting = false,
    filling = false,
    line = false,
    startX=0,startY=0,
    existingLines = [];


function handleModeClick(event){
    if(filling === false){
        filling = true;
        mode.innerText="PAINT"
        
    }else{
        filling = false;
        mode.innerText="FILL";
    }

}

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    //ctx.fillRect(0,0,640,550)
 
    if(filling ===false){
        if(line===false){
            if(!painting){
                 ctx.beginPath();//시작위치
                 ctx.moveTo(x,y);
            }else{
                ctx.lineTo(x,y);//이전 위치부터 현재까지 선을 이음
                ctx.stroke()
            }
            
        }
        // else{
        //     if(!painting){
        //         startX = x;
        //         startY = y;
        //     }else{
                
        //         ctx.beginPath();//시작위치
        //         ctx.moveTo(startX,startY);
        //         ctx.lineTo(x,y);//이전 위치부터 현재까지 선을 이음
        //         ctx.stroke()
        //         existingLines.push({
        //             startX,
        //             startY,
        //             endX:x,
        //             endY:y,
        //             color:ctx.strokeStyle,
        //             width:ctx.lineWidth
        //         })
        //     }
        // }
    }
    
}

function changeColor(event){
    if(filling ===false){
        ctx.strokeStyle = event.target.style.backgroundColor;
    }
    else{
        ctx.fillStyle=event.target.style.backgroundColor;
        ctx.fillRect(0,0,640,550);
    }
}

function rangeChange(event){
    ctx.lineWidth = event.target.value;
}

function handleSaveClick(event){
    const check = confirm("저장하시겠습니까?");
    if(!check) return;
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "image";
    document.body.appendChild(link);
    link.click();
}
function handleContextClick(event){
    event.preventDefault();
}
function handleLineClick(event){
    if(line===false){
        lineBtn.innerText = "Line on";
        line = true;
    }else{
        lineBtn.innerText = "Line off";
        line = false;
    }
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("contextmenu", handleContextClick);
}
Array.from(colors).forEach(color=>color.addEventListener("click",changeColor));
if(range){
    range.addEventListener("input",rangeChange);
}
if(mode){
    mode.addEventListener("click",handleModeClick);
}
if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}
if(lineBtn){
    lineBtn.addEventListener("click",handleLineClick);
}
