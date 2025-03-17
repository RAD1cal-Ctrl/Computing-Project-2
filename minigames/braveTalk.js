// braveTalk.js

export function braveTalk() {
    const conversation = [
        {
            question: "How would you greet someone?",
            options: ["Hi!", "Leave me alone", "What’s up?"],
            correct: "Hi!" // Correct answer that builds confidence
        },
        {
            question: "What would you say if someone says 'You did great!'?",
            options: ["Thanks!", "I didn’t do well.", "I want to leave."],
            correct: "Thanks!"
        }
    ];

    let currentIndex = 0;

    function displayDialogue() {
        if (currentIndex < conversation.length) {
            const currentConversation = conversation[currentIndex];
            const answer = prompt(currentConversation.question + "\n" + currentConversation.options.join("\n"));
            if (answer === currentConversation.correct) {
                alert("Great job, Yassine!");
            } else {
                alert("It's okay to make mistakes. Let's try again.");
            }
            currentIndex++;
            displayDialogue();
        } else {
            alert("You helped Yassine gain confidence! Well done!");
        }
    }

    displayDialogue();
}
