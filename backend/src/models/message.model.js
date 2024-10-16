const { DataTypes, Model } = require("sequelize");

const Message = (sequelize) => {
  class Message extends Model {}
  Message.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { sequelize, modelName: "Message", tableName: "Messages" }
  );
  return Message;
};

module.exports = Message;
