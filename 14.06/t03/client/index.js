let UserName;
const socket = new WebSocket("ws://localhost:8080");

let a = document.getElementById("name");
a.addEventListener("keydown", event => {
  if (event.key == "Enter") {
    UserName = a.value;
    console.log(`UserName: ${UserName}`);
  }
});

let b = document.getElementById("mes");
b.addEventListener("keydown", event => {
  if (event.key == "Enter") {
    let a = { name: UserName, txt: b.value };
    socket.send(JSON.stringify(a));
    b.value = "";
  }
});

// function initCommunication() {
//   let socket = new WebSocket("ws://localhost:8080");

//   socket.onopen = (event) => {
//     console.log("Socket open");
//     socket.send("Hello from client");
//   };

//   socket.onmessage = (event) => {
//     console.log(`Message received ${event.data}`);
//   }
// }
//initCommunication();

// socket.onmessage = (event) => {
//   console.log(`Client (${UserName}) says: ${event.data}`);

// if (//document.getElementById("name").value() == ) console.log("OK");
//};

// socket.onopen = (event) => {
//   let mess = value;
//   console.log(mess);
//   socket.send(mess);
// }

socket.onmessage = event => {
  //console.log(`Client (${UserName}) says: ${event.data}`);

  let ids = document.getElementById("chat");

  let nam = document.createElement("p");
  let el = document.createElement("p");
  let e = document.createElement("br");
  el.innerHTML = JSON.parse(event.data).txt;
  
  let name = JSON.parse(event.data).name;

  if (name == undefined) {
    name = "anon";
  }
  if (name == document.getElementById("name").value) {
    el.className = "me";
    ids.appendChild(el);
  } else {
    el.className = "bratan";

    nam.innerText = name;
    nam.className = "nam";
    ids.appendChild(nam);
    ids.appendChild(el);
  }
  
  ids.appendChild(e);  
  //$(el).empty();
};
