const messagesList = document.querySelector('#messages');
const messageCount = document.querySelector('#message-count');
const statusMessage = document.querySelector('#status');

async function loadMessages() {
  try {
    const response = await fetch('/api/messages');
    if (!response.ok) {
      throw new Error('The server could not load messages.');
    }

    const messages = await response.json();
    messagesList.replaceChildren();

    for (const message of messages) {
      const item = document.createElement('li');
      item.className = 'message';

      const author = document.createElement('p');
      author.className = 'message-author';
      author.textContent = message.author;

      const text = document.createElement('p');
      text.className = 'message-text';
      text.textContent = message.text;

      item.append(author, text);
      messagesList.append(item);
    }

    messageCount.textContent = `${messages.length} messages`;
    statusMessage.textContent = messages.length === 0 ? 'There are no messages yet.' : '';
  } catch (error) {
    statusMessage.textContent = 'Could not load messages. Check that the server is running.';
    console.error(error);
  }
}

loadMessages();