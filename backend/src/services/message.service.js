const CustomError = require("../utils/CustomError");
require("dotenv").config();

class MessageService {
  constructor({ messageRepository }) {
    this.messageRepository = messageRepository;
  }

  async createMessage(chatId, senderId, content) {
    const message = await this.messageRepository.createMessage(
      chatId,
      senderId,
      content
    );
    return message;
  }
}

module.exports = MessageService;
