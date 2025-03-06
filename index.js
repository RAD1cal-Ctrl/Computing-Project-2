const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

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
        c.drawImage(this.image, 0, -200)
    }
}

const background = new Sprite({
    position: {
        x: 0,
        y: -200
    },
    image: image    //  this will call image in sprint all the wal down to make a loop
})

//  creating a loop for the animation
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()// calls draw in sprint
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
}
animate()



//-----------------------------------------------Player Movement----------------------------------------------

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            console.log('press w key')
            break

        case 'a':
            console.log('press a key')
            break

        case 's':
            console.log('press s key')
             break

        case 'd':
            console.log('press d key')
            break
    }
})