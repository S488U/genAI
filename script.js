const output = (text) => {
    const dataSet = {
        "hi how are you": "I'm fine, thank you! How about you?",
        "hello": "Hello! How can I help you today?",
        "what is your name": "I am a simple chatbot created to assist you.",
        "where are you from": "I exist in the digital realm!",
        "from": "I exist in the digital realm!",
        "what's your name": "I am a chat AI.",
        "tell me a joke": getRandomJoke,
        "how is the weather": "I can't check the weather, but I hope it's nice where you are!",
        "what do you do": "I assist users like you by answering questions and providing information.",
        "help me": "Sure! What do you need help with?",
        "thank you": "You're welcome! If you have more questions, feel free to ask!",
        "goodbye": "Goodbye! Have a great day!",
        "do you like programming": "I think programming is fascinating! It powers many of the things we use every day."
    };

    const jokes = [
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "Why don't skeletons fight each other? They don't have the guts.",
        "What do you call fake spaghetti? An impasta!",
        "Why did the bicycle fall over? Because it was two-tired!",
        "What do you call cheese that isn't yours? Nacho cheese!",
        "Why did the math book look sad? Because it had too many problems!",
        "What do you get when you cross a snowman and a vampire? Frostbite!"
    ];

    function getRandomJoke() {
        const randomIndex = Math.floor(Math.random() * jokes.length);
        return jokes[randomIndex];
    }

    function evaluateMathExpression(expression) {
        try {
            const result = eval(expression);
            return `The result is: ${result}`;
        } catch (error) {
            return "Sorry, I couldn't evaluate that. Please check your expression.";
        }
    }

    const normalizedText = text.replace(/[!?.,]/g, '').toLowerCase();
    const mathKeywords = ["add", "plus", "subtract", "minus", "multiply", "times", "divide", "divided", "calculate", "solve", "do for me", "can you do", "help me", "do me a favour", "do"];
    const containsMathKeywords = mathKeywords.some(keyword => normalizedText.includes(keyword));

    if (containsMathKeywords) {
        let expression = normalizedText
            .replace(/add/g, '+')
            .replace(/plus/g, '+')
            .replace(/subtract|minus/g, '-')
            .replace(/multiply|times/g, '*')
            .replace(/divide|divided/g, '/');
        expression = expression.replace(/[^0-9+\-*/.]/g, ' ').trim();
        return evaluateMathExpression(expression);
    }

    const inputWords = normalizedText.split(" ");
    let bestResponse = "I'm not sure how to respond to that.";
    let highestScore = 0;

    for (const key in dataSet) {
        const keyWords = key.split(" ");
        const matches = inputWords.filter(word => keyWords.includes(word)).length;
        const matchScore = matches / keyWords.length;

        if (matchScore >= 0.3 && matchScore > highestScore) {
            highestScore = matchScore;
            bestResponse = typeof dataSet[key] === 'function' ? dataSet[key]() : dataSet[key];
        }
    }

    return bestResponse;
};

// UI Interaction
document.getElementById('send-button').addEventListener('click', () => {
    const inputField = document.getElementById('user-input');
    const userInput = inputField.value;
    inputField.value = '';

    const chatArea = document.getElementById('chat');
    chatArea.innerHTML += `<div class="text-left text-gray-700"><strong>User:</strong> ${userInput}</div>`;

    const response = output(userInput);
    chatArea.innerHTML += `<div class="text-right text-blue-600"><strong>Chat AI:</strong> ${response}</div>`;

    chatArea.scrollTop = chatArea.scrollHeight; // Auto-scroll to the bottom
});
