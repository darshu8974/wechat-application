const firebaseConfig = {
  apiKey: "AIzaSyCjqBWJ6mNR0O0ZVpb-jlEuVSqnamsM3ag",
  authDomain: "wechat-c50b1.firebaseapp.com",
  databaseURL: "https://wechat-c50b1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wechat-c50b1",
  storageBucket: "wechat-c50b1.appspot.com",
  messagingSenderId: "848995225047",
  appId: "1:848995225047:web:010d06d9d1163c66850f92"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function sendMessage() {
  const username = document.getElementById("username").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!username) {
    alert("Please enter your name.");
    return;
  }

  if (!message) {
    alert("Please enter a message.");
    return;
  }

  db.ref("messages").push({
    user: username,
    text: message,
    time: new Date().toLocaleTimeString()
  });

  document.getElementById("message").value = "";
}

function clearMessages() {
  if (confirm("Are you sure you want to delete all messages?")) {
    db.ref("messages").remove();
    document.getElementById("chat-box").innerHTML = "";
  }
}

db.ref("messages").on("child_added", function(snapshot) {
  const msg = snapshot.val();
  const chatBox = document.getElementById("chat-box");
  const msgDiv = document.createElement("div");

  const currentUser = document.getElementById("username").value.trim();
  msgDiv.classList.add("msg");

  if (msg.user === currentUser) {
    msgDiv.classList.add("msg-right");
  } else {
    msgDiv.classList.add("msg-left");
  }

  msgDiv.innerHTML = `
    <div style="margin-bottom: 5px;">
      <strong>${msg.user}</strong>
    </div>
    <div>${msg.text}</div>
  `;

  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
});

let bgIndex = 0;
const backgrounds = [
  "linear-gradient(90deg, rgba(77, 0, 3, 1) 0%, rgba(0, 75, 89, 1) 100%)",
  "linear-gradient(90deg, rgba(218, 197, 116, 1) 0%, rgba(80, 0, 0, 1) 100%)",
  "linear-gradient(90deg, rgba(118, 93, 105) 0%, rgba(0, 74, 89, 1) 100%)",
  "linear-gradient(90deg, rgba(12, 107, 223, 0.8) 0%, rgba(190, 113, 26, 0.8) 100%)",
  "conic-gradient(from 90deg, rgba(47, 17, 54, 1) 0deg, rgba(110, 126, 169, 1) 360deg))",
  "linear-gradient(90deg, rgba(206, 198, 186, 1) 0%, rgba(145, 112, 108, 1) 100%)",
  "conic-gradient(from 45deg, rgba(67, 95, 112, 1) 0deg, rgba(162, 96, 76, 1) 360deg)"
];

function changeBackground() {
  document.body.style.background = backgrounds[bgIndex];
  document.body.style.backgroundAttachment = "fixed";
  bgIndex = (bgIndex + 1) % backgrounds.length;
}

document.getElementById("message").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});
