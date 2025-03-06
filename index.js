const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

//c.drawiImage('/Img/map.png') passing a sting wont work as it it not on HTML

const image = new Image()  //const image = new Image('/Img/map.png') not recognised by api
image.src = '/Img/map.png'
console.log(image)


image.onload = () => {  // without this the image is being called before HTML is loaded
    c.drawImage(image, -100, -200)
}
