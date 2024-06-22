let UserName, RoomName;
const socket = new WebSocket("ws://localhost:3030");

let a = document.getElementById("MyButton");
a.addEventListener("click", () => {
  let b = document.getElementById("name");
  let c = document.getElementById("room");

  UserName = b.value;
  RoomName = c.value;

  if (UserName == '')
    alert("Please type ur name!");
  if (RoomName == '')
    alert("Please type ur room name!");

  console.log(`UserName: ${UserName}, Room: ${RoomName}`);
});

let m = document.getElementById("mes");
m.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    let a = { name: UserName, text: m.value };
    if (a.name == undefined)
      alert("Enter name!!!");
    else
      socket.send(JSON.stringify(a));
    m.value = "";
  }
});

socket.onmessage = (event) => {
  let ids = document.getElementById("chat");

  let el = document.createElement("p");
  let e = document.createElement("br");
  el.innerHTML = JSON.parse(event.data).text;
  let name = JSON.parse(event.data).name;

  if (name == undefined)
    return;
  if (name == document.getElementById("name").value) {
    el.className = "me";
    ids.appendChild(el);
  } else {
    el.className = "bratan";
    ids.appendChild(el);
  }
  
  ids.appendChild(e);
};
