const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");
const leave = document.getElementById("leave-btn");

const { userId } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const to = userId === "user-1" ? "user-2" : "user-1";
console.log(11, userId);

const chatId = "chat-1";

const socket = io("http://localhost:3000/");

socket.emit("joinRoom", { userId, chatId });

socket.on("message", (message) => {
  console.log(18, message);
  outputMessage(message);
});

// socket.on("onlineUsers", ({ room, users }) => {
//   outputUsers(users);
//   outputRoomName(room);
// });

chatForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  let message = e?.target?.elements.msg.value;
  console.log(30, message);
  socket.emit("chatMessage", {
    chatId: "1",
    senderId: userId,
    content: message,
  });
});

leave?.addEventListener("click", () => {
  window.location.href = "index.html";
});

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");

  const p = document.createElement("p");
  p.classList.add("meta");
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);

  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = message.text;
  div.appendChild(para);

  document.querySelector(".chat-messages")?.appendChild(div);
}

function outputRoomName(room) {
  roomName.innerText = room;
}

function outputUsers(users) {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.username;
    userList.appendChild(li);
  });
}
