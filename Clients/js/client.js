const socket = io("http://127.0.0.1:8000");
let mainDiv = document.querySelector(".msger-chat");
let form = document.querySelector(".msger-inputarea");
let inout = document.querySelector(".msger-input");

const Uname = prompt("Enter Your Name");

const append = (msg, position, Username) => {
  let element = `<div class="msg ${position}-msg">
                        <div class="msg-bubble">
                            <div class="msg-info">
                                <div class="msg-info-name">${Username}</div>
                            </div>
                            <div class="msg-text">
                                ${msg}
                            </div>
                        </div>
                    </div>`;

  mainDiv.insertAdjacentHTML("beforeend", element);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let msg = inout.value;
  append(`${msg}`, "right", "You");
  socket.emit("send-msg", msg);
  inout.value = "";
});

socket.emit("user-joined", Uname);

socket.on("user-details", (name) => {
  append("Joined The Chat", "left", name);
  // console.log(name);
});

socket.on("recieve", (data) => {
  append(`${data.msg}`, "left", `${data.name}`);
});

socket.on("left", (name) => {
  append(`Left The Chat`, "left", `${name}`);
});
