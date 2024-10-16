const { encryptMessage, decryptMessage } = require("../utils/encryption");

class MessageService {
  constructor({ messageRepository }) {
    this.messageRepository = messageRepository;
  }

  async createMessage(chatId, senderId, content) {
    const encryptedContent = encryptMessage(content);
    const message = await this.messageRepository.createMessage({
      content: encryptedContent,
    });
    await message.setChat(chatId);
    await message.setUser(senderId);
    return message;
  }

  async getMessagesByChatId(chatId) {
    const messages = await this.messageRepository.getMessagesByChatId(
      Number(chatId)
    );
    messages.forEach((message) => {
      message.content = decryptMessage(message.content);
    });
    return messages;
  }
}

module.exports = MessageService;
