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
  "url('https://cdn.pixabay.com/photo/2020/02/17/06/06/animal-4855514_1280.jpg')",
  "url('https://cdn.pixabay.com/photo/2019/01/30/13/06/spring-3964555_1280.jpg')",
  "url('https://cdn.pixabay.com/photo/2017/12/23/22/12/orange-3036097_1280.jpg')",
  "url('https://cdn.pixabay.com/photo/2022/05/03/23/40/bee-7172838_1280.jpg')",
  "url('https://cdn.pixabay.com/photo/2014/11/21/03/24/mountains-540115_1280.jpg')"
];



function changeBackground() {
  document.body.style.backgroundImage = backgrounds[bgIndex];
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center center";
  document.body.style.backgroundAttachment = "fixed";

  bgIndex = (bgIndex + 1) % backgrounds.length;
}


document.getElementById("message").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});
