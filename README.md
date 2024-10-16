# Chat App

Welcome to the Chat App! This application allows users to communicate in real-time through text messages.

## Features

- Real-time messaging
- User authentication
- Message history
- Message encryption
- Ability to send images

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aayushah711/chat-app-2.git
   ```
2. Navigate to the project directory:
   ```bash
   cd chat-app-2
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   cd ../backend
   npm install
   cd ..
   ```

## Usage

1. Start the frontend development server:
   ```bash
   cd frontend
   open with live server
   ```
2. Start the backend development server:
   ```bash
   cd ../backend
   nodemon index.js
   ```
3. Open your browser and navigate to `http://127.0.0.1:5500/frontend/index.html`.

## Data Models

Users - id, email, password

Messages - id, chatId, senderId, content, imageUrl
1 user can have many messages
1 message can have 1 user

Chats - id, groupTitle
1 Message can be part of 1 chat
1 Chat can have many Messages

UserChats - chatId, userId
Users & Chats have many to many mapping

<!--
## Steps

user1 logs in
get all chats => db fetch

user1 clicks on a chat
join chat room
get last 20 rows

When user1 sends a message to user2
On frontend emit("chatMessage", message)
On backend on("chatMessage",cb)

Inside cb:
Store message in db: {messageId, chatId, senderId, content, createdAt}
send event (eventName: "chat-message-for-user2", message: {id, senderId, content, createdAt})

user2 who is logged in, is listening to (eventName: "chat-message-for-user2")
-->
