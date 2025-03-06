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
console.log(image)

//-----------------------------------------------Player----------------------------------------------

const playerImage = new Image()
playerImage.src = '/Img/playerDown.png'


image.onload = () => {  // without this the image is being called before HTML is loaded
    c.drawImage(image, 0, -200)
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