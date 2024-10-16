class MessageRepository {
  constructor({ models }) {
    this.Message = models.Message;
  }

  async createMessage(messageData) {
    try {
      const message = await this.Message.create(messageData);
      return message;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMessagesByChatId(chatId) {
    try {
      const messages = await this.Message.findAll({
        where: { chatId },
      });
      return messages;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = MessageRepository;
