const onConnection = (socket, io, container) => {
  console.log("a user connected");

  socket.on("joinRoom", async ({ userId, chatId }) => {
    try {
      const user = await container.cradle.userService.getUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const chat = await container.cradle.chatService.getChatById(chatId);
      if (!chat) {
        throw new Error("chat not found");
      }

      socket.join(chatId);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("chatMessage", async (data) => {
    const { chatId, senderId, content } = data;

    try {
      // Call the chat service to handle the message business logic
      const message = await container.cradle.messageService.createMessage(
        chatId,
        senderId,
        content
      );

      const { content: encryptedContent, messageWithoutEncryptedContent } =
        message.dataValues;

      // Emit the message to all clients in the chat room
      io.to(chatId).emit("newMessage", {
        ...messageWithoutEncryptedContent,
        content,
      });
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
};

module.exports = onConnection;

// class SocketManager {
//   constructor({ messageService, io }) {
//     this.messageService = messageService;
//     this.io = io;

//     // establishConnection(userId) {
//     //   console.log(11, userId);
//     //   const socket = io("http://localhost:3000/");
//     //   socket.on(`chat-message-for-${userId}`, (message) => {
//     //     console.log(18, message);
//     //     outputMessage(message);
//     //   });
//     // }
//     io.on("connection", (socket) => {
//       console.log("New user connected:", socket.id);

//       // socket.on("sendMessage", async (data) => {
//       //   const { chatId, senderId, content } = data;

//       //   try {
//       //     const message = await this.createMessage(
//       //       chatId,
//       //       senderId,
//       //       content
//       //     );
//       //     io.to(chatId).emit("newMessage", message);
//       //   } catch (error) {
//       //     console.error("Error processing message:", error);
//       //   }
//       // });

//       // socket.on("disconnect", () => {
//       //   console.log("User disconnected:", socket.id);
//       // });
//     });
//   }

//   async createMessage(chatId, senderId, content) {
//     const message = await this.messageService.createMessage(
//       chatId,
//       senderId,
//       content
//     );
//     return message;
//   }
// }
// module.exports = SocketManager;
