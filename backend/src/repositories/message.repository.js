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
}

module.exports = MessageRepository;
