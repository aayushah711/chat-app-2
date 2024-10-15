const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const sequelize = require("../utils/db.js");

const initializeModels = async () => {
  const db = {};

  // Load each model file dynamically
  fs.readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-9) === ".model.js"
    )
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(sequelize); // Initialize model
      db[model.name] = model; // Add to the db object
    });

  //   // Define associations here
  const { User, Message, Chat } = db;

  if (User && Message && Chat) {
    // User.hasOne(Message, { foreignKey: "userId" });
    // Message.belongsTo(User, { foreignKey: "userId" });

    User.hasMany(Message, { foreignKey: "senderId" });
    Message.belongsTo(User, { foreignKey: "senderId" });

    Chat.hasMany(Message, { foreignKey: "chatId" });
    Message.belongsTo(Chat, { foreignKey: "chatId" });

    User.belongsToMany(Chat, {
      through: "UserChats",
      foreignKey: "userId",
    });
    Chat.belongsToMany(User, {
      through: "UserChats",
      foreignKey: "chatId",
    });
  }

  try {
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("Error syncing models", error);
  }

  db.sequelize = sequelize; // Add Sequelize instance to db object
  return db;
};

module.exports = initializeModels;
