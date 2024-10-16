const { encryptMessage } = require("../utils/encryption");

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
    return this.messageRepository.getMessagesByChatId(Number(chatId));
  }
}

module.exports = MessageService;
