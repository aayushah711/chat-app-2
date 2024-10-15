class ChatController {
  constructor({ chatService, handleError }) {
    this.chatService = chatService;
    this.handleError = handleError;
  }

  createChat = async (req, res) => {
    try {
      const chat = await this.chatService.createChat(req.body);
      return res.status(201).json(chat.dataValues);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  getChat = async (req, res) => {
    try {
      const chat = await this.chatService.getChatById(req.params.id);
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
      res.json(chat);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  updateChat = async (req, res) => {
    try {
      const chat = await this.chatService.updateChat(req.params.id, req.body);
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
      res.json(chat);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  deleteChat = async (req, res) => {
    try {
      const chat = await this.chatService.deleteChat(req.params.id);
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
      res.json({ message: "Chat deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = ChatController;
