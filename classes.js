//this class will be ised to the screen can move the map with the character
class Sprite{
    constructor({position, image, frames = {max: 1}, sprites }) {
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed :0}
        
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
          }    
          this.moving = false
          this.sprites = sprites
    }
    draw(){
        const cropWidth = this.image.width / this.frames.max
        const cropX = this.frames.val * cropWidth 
     //   c.drawImage(this.image, this.position.x, this.position.y)
     c.drawImage(
        this.image,
        cropX,           // <-- multiply frames.val by the width of each frame
        0,               // sourceY stays 0 if you only have a "down" row
        cropWidth,       // width of one frame
        this.image.height,
        this.position.x,
        this.position.y,
        cropWidth,       // drawn width
        this.image.height
      ) 

       // Only animate if moving
    if (!this.moving) return

     // Increment animation frames
    if (this.frames.max > 1) {
        this.frames.elapsed++
    if (this.frames.elapsed % 10 === 0) {
        if (this.frames.val < this.frames.max - 1) {
            this.frames.val++
        } else {
        this.frames.val = 0
      }
    }
  }
}
}

class Boundary {
    static width = 36
    static height = 36 
    constructor({position}){
        this.position = position
        this.width = 36
        this.height = 36
    }

    draw(){
        c.fillStyle = 'rgba(255, 0, 0, 0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}