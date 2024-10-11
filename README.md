# Chat App

Welcome to the Chat App! This application allows users to communicate in real-time through text messages.

## Features

- Real-time messaging
- User authentication
- Group chats
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
   cd frontend
   npm install
   cd ../backend
   npm install
   cd ..
   ```

## Usage

1. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```
2. Start the backend development server:
   ```bash
   cd ../backend
   npm start
   ```
3. Open your browser and navigate to `http://localhost:3000`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

<!--
Entities
Users - id, email, password
Messages - id, conversationId, senderId, content
Conversations - id, groupTitle
ConversationsUsers - conversationId, userId
Users & Conversations have many to many mapping
 -->
