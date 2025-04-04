

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 2520
canvas.height = 670

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i))
}

//-----------------------------------------------Boundary----------------------------------------------

const boundaries = []
const offset = {
    x: 0,
    y: -200
}
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 1025) {
        boundaries.push(new Boundary({
          position: {
            x: j * Boundary.width + offset.x,  // j is the column index
            y: i * Boundary.height + offset.y  // i is the row index
          }
        }))
      }
    })
  })
  
//console.log(boundaries)

//-----------------------------------------------MAP----------------------------------------------
//c.drawiImage('/Img/map.png') passing a sting wont work as it it not on HTML
const image = new Image()  //const image = new Image('/Img/map.png') not recognised by api
image.src = '/Img/map.png'

const foregroundImage = new Image()  
foregroundImage.src = '/Img/foregroundImages.png'

//-----------------------------------------------Player----------------------------------------------

const playerDownImage = new Image()
playerDownImage.src = '/Img/down_walk_char.png'

const playerUpImage = new Image()
playerUpImage.src = '/Img/up_walk_char.png'

const playerLeftImage = new Image()
playerLeftImage.src = '/Img/left_walk_char.png'

const playerRightImage = new Image()
playerRightImage.src = '/Img/right_walk_char.png'

//image.onload = () => {  // without this the image is being called before HTML is loaded
 
//-----------------------------------------------Animation----------------------------------------------
// canvas.addEventListener("click", (event) => {
//     const rect = canvas.getBoundingClientRect();

//     // Get the true game-world coordinates
//     const worldX = event.clientX - rect.left - offset.x;
//     const worldY = event.clientY - rect.top - offset.y;

//     console.log(`World X: ${worldX}, World Y: ${worldY}`);
// });

//  //  Actual image that will be seen
//  265 - (this.image.width / 4)/16 , 
//  250 - this.image.height / 2,

// Npc
const npc1Image = new Image();
npc1Image.src = "/Img/Jaden_Idle.png";

const npc2Image = new Image();
npc2Image.src = "/Img/Yassine_Idle.png"; 

const npc3Image = new Image();
npc3Image.src = "/Img/Evie_Idle.png"; 

const npc1 = new Sprite({
    position: { x: 1975, y: 820 }, 
    image: npc1Image,
    frames: { max: 2 } 
});

const npc2 = new Sprite({
    position: { x: 250, y: 100 },
    image: npc2Image,
    frames: { max: 2 }
});

const npc3 = new Sprite({
    position: { x: 350, y: 830 },
    image: npc3Image,
    frames: { max: 2 }
});

const npcs = [npc1, npc2, npc3];

const player = new Sprite({
    position: {
        x: 400,
        y: 300
      },
    
    image: playerDownImage,
    frames: { max: 4 }, // matches the constructor param "frames"

    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage

    }

})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image    //  this will call image in sprint all the way down to make a loop
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage    //  this will call foregroundImage in sprint all the wau down to make a loop
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
}


const movables = [background, ...boundaries, foreground, ...npcs]
//  creating a loop for the animation

function rectangularCollision({rectangle1, rectangle2}) {
    return(
        rectangle1.position.x < rectangle2.position.x + rectangle2.width &&
        rectangle1.position.x + rectangle1.width > rectangle2.position.x &&
        rectangle1.position.y < rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height > rectangle2.position.y

    )

}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()// calls draw in sprint

    boundaries.forEach(boundary => {
       boundary.draw()
    })

    npcs.forEach(npc => {
        npc.draw();
    });
    
    npcs.forEach(npc => {
        if (
            Math.abs(player.position.x - npc.position.x) < 100 && 
            Math.abs(player.position.y - npc.position.y) < 100
        ) {
            console.log("Press 'E' to interact"); 
        }
    });
    

    player.draw()
    foreground.draw()

    let moving = true
    player.moving = false

    const speed = 4

    //moving up
    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, 
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                    }}
                })
              ) {
                console.log('colliding')
                moving = false
                break 
              }
        }
        if (moving)
            //player.moving = false
        movables.forEach ((movable) => {movable.position.y += speed})}
        
        //moving left
        else if (keys.a.pressed && lastKey === 'a') {
            player.moving = true
            player.image = player.sprites.left

            for (let i = 0; i < boundaries.length; i++){
                const boundary = boundaries[i]
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: {...boundary, 
                            position: {
                                x: boundary.position.x + 3,
                                y: boundary.position.y
                        }}
                    })
                  ) {
                    console.log('colliding')
                    moving = false
                    break 
                  }
            }
        if (moving)
            //player.moving = false
        movables.forEach ((movable) => {movable.position.x += speed})}
        
        //moving down
        else if (keys.s.pressed && lastKey === 's') {
            player.moving = true
            player.image = player.sprites.down

            for (let i = 0; i < boundaries.length; i++){
                const boundary = boundaries[i]
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: {...boundary, 
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y - 3
                        }}
                    })
                  ) {
                    console.log('colliding')
                    moving = false
                    break 
                  }
            }
        if (moving)
            //player.moving = false
        movables.forEach ((movable) => {movable.position.y -= speed})}
        
        //moving right
        else if (keys.d.pressed && lastKey === 'd') {
            player.moving = true
            player.image = player.sprites.right

            for (let i = 0; i < boundaries.length; i++){
                const boundary = boundaries[i]
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: {...boundary, 
                            position: {
                                x: boundary.position.x - 3,
                                y: boundary.position.y
                        }}
                    })
                  ) {
                    console.log('colliding')
                    moving = false
                    break 
                  }
            }
        if (moving)
        movables.forEach ((movable) => {movable.position.x -= speed})}

}



animate()

let lastKey = ''

//-----------------------------------------------Player Movement----------------------------------------------

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break

        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break

        case 's':
            keys.s.pressed = true
            lastKey = 's'
             break

        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
   // console.log(keys)
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break

        case 'a':
            keys.a.pressed = false
            break

        case 's':
            keys.s.pressed = false
             break

        case 'd':
            keys.d.pressed = false
            break
    }
    //console.log(keys)
})

window.addEventListener("keydown", (e) => {
    if (e.key === "e") {
        npcs.forEach(npc => {
            if (
                Math.abs(player.position.x - npc.position.x) < 100 && 
                Math.abs(player.position.y - npc.position.y) < 100
            ) {
                startMinigame(npc);
            }
        });
    }
});

function startMinigame(npc) {
    if (npc === npc1) {
        console.log("Starting minigame 1...");
        // Load Jaden's game
    } else if (npc === npc2) {
        console.log("Starting minigame 2...");
        // Load Yassine's game
    } else if (npc === npc3) {
        console.log("Starting minigame 3...");
        // Load Evie's game
    }
}
