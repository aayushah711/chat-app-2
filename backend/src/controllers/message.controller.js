class MessageController {
  constructor({ messageService, handleError }) {
    this.messageService = messageService;
    this.handleError = handleError;
  }

  createMessage = async (req, res) => {
    try {
      const message = await this.messageService.createMessage(req.body);
      const { password, ...messageWithoutPassword } = message.dataValues;
      return res.status(201).json(messageWithoutPassword);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  getMessage = async (req, res) => {
    try {
      const message = await this.messageService.getMessageById(req.params.id);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      return res.status(200).json(message);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  getMessagesByChatId = async (req, res) => {
    try {
      const messages = await this.messageService.getMessagesByChatId(
        req.query.chatId
      );
      return res.status(200).json(messages);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  updateMessage = async (req, res) => {
    try {
      const message = await this.messageService.updateMessage(
        req.params.id,
        req.body
      );
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.json(message);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  deleteMessage = async (req, res) => {
    try {
      const message = await this.messageService.deleteMessage(req.params.id);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.json({ message: "Message deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = MessageController;
