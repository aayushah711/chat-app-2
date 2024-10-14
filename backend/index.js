const express = require("express");
const http = require("http");
const configureContainer = require("./src/config/di.config");
const bodyParser = require("body-parser");
require("dotenv").config();
const authRoutes = require("./src/routes/auth.routes");
const initializeModels = require("./src/models");
const sequelize = require("./src/utils/db");
const { Server } = require("socket.io");
const onConnection = require("./src/utils/socketManager");

const createServer = async () => {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://127.0.0.1:5500", // specify the allowed origins
      methods: ["GET", "POST"],
      allowedHeaders: ["chat-app"],
      credentials: true,
    },
  });

  app.use(bodyParser.json());
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
