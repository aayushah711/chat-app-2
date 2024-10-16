const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");
const leave = document.getElementById("leave-btn");

const { userId } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const chatId = userId === "d7f5a66d-ad45-4ed5-a93e-323809f760c3" ? 2 : 1;

const socket = io("http://localhost:3000/");

socket.emit("joinRoom", { userId, chatId });

socket.on("newMessage", (message) => {
  outputMessage(message);
});

chatForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  let message = e?.target?.elements.msg.value;
  socket.emit("chatMessage", {
    chatId,
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
  p.innerText = message.senderId;
  p.innerHTML += `<span>${message.updatedAt}</span>`;
  div.appendChild(p);

  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = message.content;
  div.appendChild(para);

  document.querySelector(".chat-messages")?.appendChild(div);
}

// on load of page make an api call to fetch all messages
document.addEventListener("DOMContentLoaded", () => {
  console.log("Fetching messages...");

  const token =
    localStorage.getItem("token") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliM2I4YTk4LTVhOTctNDY0Zi1hM2FmLTY2OTI1YWE4NmM4NiIsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJpYXQiOjE3MjkwNTQ2NTUsImV4cCI6MTcyOTA1ODI1NX0.NbZwfY7DAqe-d2-XzOjRvq5EH761b5Dy_vxRSgvfXZk";
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  fetch(`http://localhost:3000/message?chatId=${chatId}`, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((messages) => {
      messages.forEach((message) => {
        outputMessage(message);
      });
    })
    .catch((error) => console.error("Error fetching messages:", error));
});
