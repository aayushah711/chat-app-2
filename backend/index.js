const express = require("express");
const http = require("http");
const configureContainer = require("./src/config/di.config");
const bodyParser = require("body-parser");
require("dotenv").config();
const authRoutes = require("./src/routes/auth.routes");
const chatRoutes = require("./src/routes/chat.routes");
const messageRoutes = require("./src/routes/message.routes");
const uploadRoutes = require("./src/routes/upload.routes");
const initializeModels = require("./src/models");
const sequelize = require("./src/utils/db");
const { Server } = require("socket.io");
const onConnection = require("./src/utils/socketManager");
const cors = require("cors");
const { origin } = require("./src/config/origin.config");

const createServer = async () => {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin,
      methods: ["GET", "POST"],
      allowedHeaders: ["chat-app"],
      credentials: true,
    },
  });

  app.use(bodyParser.json());
  app.use(
    cors({
      origin,
    })
  );

  app.use(express.json());
  const models = await initializeModels();

  const container = configureContainer(models, sequelize);

  io.on("connection", (socket) => onConnection(socket, io, container));

  app.use((req, res, next) => {
    req.container = container;
    next();
  });

  app.use((req, res, next) => {
    req.io = io;
    next();
  });

  app.use("/auth", authRoutes);
  app.use("/chat", chatRoutes);
  app.use("/message", messageRoutes);
  app.use("/upload", uploadRoutes);

  server.on("close", () => container.dispose());
  return server;
};

async function main() {
  const server = await createServer();
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
main();
