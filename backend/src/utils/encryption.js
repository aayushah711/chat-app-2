const crypto = require("crypto");
require("dotenv").config();

const algorithm = "aes-256-ctr";
const secretKey = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
const iv = Buffer.from("dcaf88be40fa31447a22dc7bcd81c3eb", "hex");

// Encryption function
const encryptMessage = (message) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(message), cipher.final()]);
  return encrypted.toString("hex");
};

// Decryption function
const decryptMessage = (content) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(content, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString();
};

let message = "Hello, World!";
let encryptedMessage = encryptMessage(message);
let decryptedMessage = decryptMessage(encryptedMessage);
console.log("Original message:", message);
console.log("Encrypted message:", encryptedMessage);
console.log("Decrypted message:", decryptedMessage);

module.exports = { encryptMessage, decryptMessage };
