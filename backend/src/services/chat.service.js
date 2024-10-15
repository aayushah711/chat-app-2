class ChatService {
  constructor({ chatRepository }) {
    this.chatRepository = chatRepository;
  }

  async createChat({ title, description, users }) {
    const chat = await this.chatRepository.createChat({ title, description });
    await chat.addUsers(users);
    return chat;
  }

  async getChatById(id) {
    return this.chatRepository.getChatById(id);
  }
}

module.exports = ChatService;
