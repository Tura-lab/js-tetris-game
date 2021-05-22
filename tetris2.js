const mainGameBoard = document.getElementById('mainGameBoard');
let highestBlockDownThere = 15
let typesOfBlocks = [[{x:5, y:1, color:'green'}, {x:6,y:1, color:'green'}, {x:7, y:1, color:'green'}],
                    [{x:5, y:1, color:'blue'},{x:5, y:2, color:'blue'}, {x:6,y:2, color:'blue'}, {x:7, y:2, color:'blue'}],
                    [{x:5, y:1, color:'brown'}, {x:5,y:2, color:'brown'}, {x:5, y:3, color:'brown'}],
                    [{x:5, y:1, color:'blue'},{x:5, y:2, color:'blue'}, {x:5,y:3, color:'blue'}, {x:6, y:3, color:'blue'}],
                    [{x:5, y:1, color:'green'}, {x:6,y:1, color:'green'}, {x:7, y:1, color:'green'}, {x:7, y:2, color:'green'}],
                    [{x:5, y:1, color:'green'}, {x:6,y:1, color:'green'}, {x:6, y:2, color:'green'}, {x:6, y:3, color:'green'}]];

let typesOfBlocks_ = [[{x:5, y:1, color:'green'}, {x:6,y:1, color:'green'}, {x:7, y:1, color:'green'}],
                     [{x:5, y:1, color:'blue'},{x:5, y:2, color:'blue'}, {x:6,y:2, color:'blue'}, {x:7, y:2, color:'blue'}],
                     [{x:5, y:1, color:'brown'}, {x:5,y:2, color:'brown'}, {x:5, y:3, color:'brown'}],
                     [{x:5, y:1, color:'blue'},{x:5, y:2, color:'blue'}, {x:5,y:3, color:'blue'}, {x:6, y:3, color:'blue'}],
                     [{x:5, y:1, color:'green'}, {x:6,y:1, color:'green'}, {x:7, y:1, color:'green'}, {x:7, y:2, color:'green'}],
                     [{x:5, y:1, color:'green'}, {x:6,y:1, color:'green'}, {x:6, y:2, color:'green'}, {x:6, y:3, color:'green'}]];

let incomingBlock = typesOfBlocks[Math.floor(Math.random()*6)];
let blocksDownThere = [];
let score = 0;
document.getElementById('score').innerHTML = score || 0;

if(localStorage.getItem('tetrisHighScore')){
    highScore = localStorage.getItem('tetrisHighScore');
}
else {
    highScore = 0;
    localStorage.setItem('tetrisHighScore', highScore);
}
document.getElementById('high').innerHTML = highScore;

const gameOver = () => {    
    clearInterval(move);
    blocksDownThere = [];
    highScore = localStorage.getItem('tetrisHighScore') || highScore;

    if (highScore < score){
        localStorage.setItem('tetrisHighScore', score);
        alert(`Your Score: ${score}\nNew High Score: ${score}`);
    
        return window.location.reload()
    }
    alert(`Your Score: ${score}\nHigh Score: ${highScore}`);
    return window.location.reload()
}

const arraysAreTheSame = (m,n) => {
    if (m.length !== n.length){
        return false;
    }
    else if (m.length == 3){
        if((m[0].y - n[0].y) == (m[1].y - n[1].y) && (m[2].y - n[2].y) == (m[0].y - n[0].y) && (m[1].y - n[1].y) == (m[2].y - n[2].y)){
            return true;
        }
    }
    else if(m.length == 4){
        if((m[0].y - n[0].y) == (m[1].y - n[1].y) && (m[2].y - n[2].y) == (m[0].y - n[0].y) && (m[1].y - n[1].y) == (m[2].y - n[2].y) && (m[1].y - n[1].y) == (m[3].y - n[3].y)){
            
            return true;
        }
    }
    return false;
}

const clearRow = row => {
    score++;
    document.getElementById('score').innerHTML = score || 0;
    // removing the finished rows
    blocksDownThere = blocksDownThere.filter(item => item.y!==row);
    // shift the other blocks down one step
    blocksDownThere.forEach(item => {
        if (item.y<row){
            item.y+=1;
        }
    })
}

const stop = () => {
    incomingBlock.forEach((item, idx) => {
        highestBlockDownThere = item.y<highestBlockDownThere ? incomingBlock[idx].y : highestBlockDownThere;
    })
    blocksDownThere = [...incomingBlock, ...blocksDownThere];
    
    typesOfBlocks=[[{x:5, y:1, color:'green'}, {x:6,y:1, color:'green'}, {x:7, y:1, color:'green'}],
                [{x:5, y:1, color:'blue'},{x:5, y:2, color:'blue'}, {x:6,y:2, color:'blue'}, {x:7, y:2, color:'blue'}],
                [{x:5, y:1, color:'brown'}, {x:5,y:2, color:'brown'}, {x:5, y:3, color:'brown'}],
                [{x:5, y:1, color:'blue'},{x:5, y:2, color:'blue'}, {x:5,y:3, color:'blue'}, {x:6, y:3, color:'blue'}],
                [{x:5, y:1, color:'green'}, {x:6,y:1, color:'green'}, {x:7, y:1, color:'green'}, {x:7, y:2, color:'green'}],
                [{x:5, y:1, color:'green'}, {x:6,y:1, color:'green'}, {x:6, y:2, color:'green'}, {x:6, y:3, color:'green'}]];
    
    incomingBlock = typesOfBlocks[Math.floor(Math.random()*5)];
}

const changeStuff = () => { 
    for (i of incomingBlock){
        if (i.y > 14){
            return stop();
        }
        
        if (blocksDownThere.some(item => i.y+1 == item.y && i.x == item.x )){
            return stop();
        }
    }
    for(i=15; i>0;i--){
        if(blocksDownThere.filter(item => item.y==i).length == 10) clearRow(i);
    }

}

const keepTheRestOfTheBoard = () => {    
    blocksDownThere.forEach(item => {
        let blockItem = document.createElement('div');
        blockItem.style.gridRowStart = item.y;
        blockItem.style.gridColumnStart = item.x;
        blockItem.style.backgroundColor = item.color;
        mainGameBoard.appendChild(blockItem);
    })
}

function move(){
    if(blocksDownThere.some(item => item.y<2)) return gameOver();
    
    mainGameBoard.innerHTML = '';
    
    incomingBlock.forEach(item => {
        let blockItem = document.createElement('div');
        blockItem.style.gridRowStart = item.y;
        blockItem.style.gridColumnStart = item.x;
        blockItem.style.backgroundColor = item.color;
        mainGameBoard.appendChild(blockItem);
    });

    keepTheRestOfTheBoard();
    
    changeStuff();
}

setInterval(move, 80);
setInterval(() => incomingBlock.forEach(item => item.y+=1), 1000)
// move();

addEventListener('keydown', e =>{
    switch (e.key) {
        case 'ArrowRight':
            let b=false
            if(!incomingBlock.some(item => item.x>9)){
                for (i of incomingBlock){
                    if((blocksDownThere.filter(item => item.y==i.y).filter(item => item.x-1==i.x).length > 0)){
                        b=true;
                    }
                }
                if (!b)incomingBlock.forEach(item => item.x+=1);
                break;
            }
            break;
        
        case 'ArrowLeft':
            let a = false
            if(!incomingBlock.some(item => item.x<2)){
                for (i of incomingBlock){
                    if((blocksDownThere.filter(item => item.y==i.y).filter(item => item.x+1==i.x).length > 0)){
                        a=true;
                    }
                }
                if (!a)incomingBlock.forEach(item => item.x-=1);
                break;
            }            
            break;
        
        case 'ArrowDown':
            let found = false;
            while(true){
                if(incomingBlock.some(item => item.y==15)) break;
                else{incomingBlock.forEach(item => {
                    if(blocksDownThere.filter(a => a.x == item.x).some(element => element.y == item.y+1)){
                        found = true;
                    };
                })}
                if(found)break;
                else{
                    incomingBlock.forEach(item => item.y+=1);
                }
            }
            break;

        case 'ArrowUp':
            if(arraysAreTheSame(incomingBlock, typesOfBlocks_[2])){
                incomingBlock[0] = {...incomingBlock[0], x:incomingBlock[0].x-1, y:incomingBlock[0].y+1}
                incomingBlock[2] = {...incomingBlock[2], x:incomingBlock[2].x+1, y:incomingBlock[2].y-1}
            }
            else if(arraysAreTheSame(incomingBlock, typesOfBlocks_[0])){
                incomingBlock[0] = {...incomingBlock[0], x:incomingBlock[0].x+1, y:incomingBlock[0].y-1}
                incomingBlock[2] = {...incomingBlock[2], x:incomingBlock[2].x-1, y:incomingBlock[2].y+1}
            }
            else if(arraysAreTheSame(incomingBlock, typesOfBlocks_[1])){
                incomingBlock[2].x-=1;
                incomingBlock[3].x-=1;
                incomingBlock[2].y+=1;
                incomingBlock[3].y+=1;
            }
            else if(arraysAreTheSame(incomingBlock, typesOfBlocks_[3])){// Not done yet
                incomingBlock[2].x+=1;
                incomingBlock[3].x+=1;
                incomingBlock[2].y-=1;
                incomingBlock[3].y-=1;
            }
            else if(arraysAreTheSame(incomingBlock, typesOfBlocks_[4])){// Not done yet
                incomingBlock[2].x-=1;
                incomingBlock[3].x-=1;
                incomingBlock[2].y+=1;
                incomingBlock[3].y+=1;
            }
            else if(arraysAreTheSame(incomingBlock, typesOfBlocks_[5])){// Not done yet
                incomingBlock[2].x+=1;
                incomingBlock[3].x+=1;
                incomingBlock[2].y-=1;
                incomingBlock[3].y-=1;
            }
            else{
                console.log(incomingBlock)
                console.log(typesOfBlocks_[2])
            }
            
        default:
            break;
    }
})

//  Remaining Tasks
// >> What to do when ArrowUp is pressed -- done
// >> What to do when a row is finnished -- kinda done
// >> How to know and what to do when the game is over
// >> Solve that weird freaking glitch -- done
// >> When ArrowUp is pressed and there's something on the left it doesn't move the blocks -- done