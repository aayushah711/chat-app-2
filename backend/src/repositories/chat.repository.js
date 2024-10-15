class ChatRepository {
  constructor({ models }) {
    this.Chat = models.Chat;
  }

  async createChat(chatData) {
    try {
      const chat = await this.Chat.create(chatData);
      return chat;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getChatById(id) {
    try {
      const chat = await this.Chat.findOne({ where: { id } });
      return chat;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ChatRepository;
