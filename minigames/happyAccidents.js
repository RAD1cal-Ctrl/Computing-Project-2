// Evie minigame

export function happyAccidents() {
    let drawingMistake = new Image();
    drawingMistake.src = '/path/to/scribbled-image.png';  //mistake image
    
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    canvas.width = 300;
    canvas.height = 300;

    // show the scribbled mistake
    drawingMistake.onload = function() {
        ctx.drawImage(drawingMistake, 0, 0);
    }

    // Player can click and "fix" the image
    canvas.addEventListener('click', function() {
        alert("Let's turn that mistake into something fun!");
        // Turn it into something creative
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(150, 150, 50, 0, Math.PI * 2);
        ctx.fill(); // Create a fluffy circle (sheep's body)
        ctx.fillStyle = 'pink';
        ctx.beginPath();
        ctx.arc(150, 130, 20, 0, Math.PI * 2);
        ctx.fill(); // Create a sheep's face
        alert("You turned a mistake into a coool sheep! :D");
    });
}
