// Jaden minigame

export function coolDownCoach() {
    let isBreathingIn = true;
    alert("Let's help Jaden cool down!");
    
    // Simple rhythm exercise: press spacebar to breathe in and out
    document.addEventListener("keydown", function(e) {
        if (e.key === " ") {
            if (isBreathingIn) {
                alert("Breathe in... hold...");
            } else {
                alert("Breathe out...");
            }
            isBreathingIn = !isBreathingIn; // Alternate between in and out
        }
    });
}
