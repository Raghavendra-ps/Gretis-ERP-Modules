document.getElementById('chat-form').onsubmit = function(e) {
    e.preventDefault();

    var userQuery = document.getElementById('user-query').value;
    if (!userQuery) return;

    appendMessage('user', userQuery);
    document.getElementById('user-query').value = '';

    // Call ChatGPT API and handle response
    fetchChatGPTResponse(userQuery).then(response => {
        appendMessage('bot', response);
    }).catch(error => {
        console.error('Error:', error);
        appendMessage('bot', 'Sorry, something went wrong. Please try again later.');
    });
};

function appendMessage(sender, text) {
    var chatWindow = document.getElementById('chat-window');
    var message = document.createElement('div');
    message.className = 'message ' + sender;
    message.innerText = text;
    chatWindow.appendChild(message);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function fetchChatGPTResponse(prompt) {
    // Replace with your actual API endpoint and key
    const apiEndpoint = 'https://erp.gretis.com/api/method/custom_bot.custom_bot.doctype.bot_configuration.bot_configuration.get_chatgpt_response';
    const apiKey = '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'; // Replace with your actual API key

    const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ prompt: prompt })
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.message; // Adjust this based on your API's response format
}
