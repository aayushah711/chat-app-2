const { DataTypes, Model } = require("sequelize");

const Chat = (sequelize) => {
  class Chat extends Model {}
  Chat.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { sequelize, modelName: "Chat", tableName: "Chats" }
  );
  return Chat;
};

module.exports = Chat;
