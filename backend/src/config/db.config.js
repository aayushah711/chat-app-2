module.exports = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "chat-app-2",
  port: Number(process.env.DB_PORT) || 5432,
};
