class ChatService {
  constructor({ chatRepository }) {
    this.chatRepository = chatRepository;
  }

  async createChat(title, description) {
    const chat = await this.chatRepository.createChat(title, description);
    return chat;
  }
}

module.exports = ChatService;
