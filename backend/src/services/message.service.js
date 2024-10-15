class MessageService {
  constructor({ messageRepository }) {
    this.messageRepository = messageRepository;
  }

  async createMessage(chatId, senderId, content) {
    const message = await this.messageRepository.createMessage({ content });
    await message.setChat(chatId);
    await message.setUser(senderId);
    return message;
  }
}

module.exports = MessageService;
