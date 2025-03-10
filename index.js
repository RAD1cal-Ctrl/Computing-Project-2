const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i))
}
class Boundary {
    static width = 48
    static height = 48 
    constructor({position}){
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

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
  
console.log(boundaries)

//-----------------------------------------------MAP----------------------------------------------
//c.drawiImage('/Img/map.png') passing a sting wont work as it it not on HTML
const image = new Image()  //const image = new Image('/Img/map.png') not recognised by api
image.src = '/Img/map.png'

//-----------------------------------------------Player----------------------------------------------

const playerImage = new Image()
playerImage.src = '/Img/playerDown.png'


//image.onload = () => {  // without this the image is being called before HTML is loaded
 
//-----------------------------------------------Animation----------------------------------------------
//this class will be ised to the screen can move the map with the character
class Sprite{
    constructor({position, velocity, image}) {
        this.position = position
        this.image = image
    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image    //  this will call image in sprint all the wal down to make a loop
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

const testBoundary = new Boundary({
    position: {
        x: 400,
        y: 400
    }
})
const movables = [background, testBoundary]
//  creating a loop for the animation
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()// calls draw in sprint

   // boundaries.forEach(boundary => {
  //      boundary.draw()
   // })
    testBoundary.draw()

    c.drawImage(
            playerImage,
    //  x cord for croping the player spread 
            0,
            0,
            playerImage.width / 4,
            playerImage.height,
        
    //  Actual image that will be seen
            265 - (playerImage.width / 4)/16 , 
            250 - playerImage.height / 2,

            playerImage.width / 4,
            playerImage.height
        )
    
        if (keys.w.pressed && lastKey === 'w') {movables.forEach ((movable) => {movable.position.y += 3})}
        else if (keys.a.pressed && lastKey === 'a') {movables.forEach ((movable) => {movable.position.x += 3})}
        else if (keys.s.pressed && lastKey === 's') {movables.forEach ((movable) => {movable.position.y -= 3})}
        else if (keys.d.pressed && lastKey === 'd') {movables.forEach ((movable) => {movable.position.x -= 3})}

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
    console.log(keys)
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
    console.log(keys)
})