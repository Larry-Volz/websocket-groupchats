/**get a joke */
async function getJoke(){
  return await axios.get("https://icanhazdadjoke.com/");
}


/** Client-side of groupchat. */

const urlParts = document.URL.split("/");

//TODO: THIS DOESN'T SEEM TO WORK
const roomName = urlParts[urlParts.length - 1];
const ws = new WebSocket(`ws://localhost:3000/chat/${roomName}`);
// console.log(`1 chat.js: ws Websocket created`)

const name = prompt("Username?");


/** called when connection opens, sends join info to server. */

ws.onopen = function(evt) {
  // console.log("open", evt);
  
  let data = {type: "join", name: name};

  const dataForConsole = JSON.stringify(data);
  // console.log(`2 chat.js: ws.onopen join info ${dataForConsole}`);

  //sends join info to server
  ws.send(JSON.stringify(data));
};


/** called when msg received from server; displays it. */

ws.onmessage = function(evt) {
  // console.log("message", evt);

  let msg = JSON.parse(evt.data);
  let item;
  
  //QUESTION: this for chat text (not bold)
  if (msg.type === "note") {

    // console.log(`3a chat.js: ws.onmessage msg.type===note msg.text == ${msg.text}`);

    item = $(`<li><i>${msg.text}</i></li>`);
  }

  //QUESTION; and then is this for name of sender (bold).  Where does "note" and "chat" come from?  How do I get a look at the structure of evt.data
  else if (msg.type === "chat") {

    // console.log(`3b chat.js: ws.onmessage msg.type===chat msg.text == ${msg.text}`);
    if (msg.text == '/joke'){
      console.log(`HERE***`);
      
      //I get an error if I use await (Uncaught SyntaxError: await is only valid in async functions and the top level bodies of modules)
      let joke = getJoke();
      item = $(`<li><b>${msg.name}: </b>${joke}</li>`);
    } else {
      item = $(`<li><b>${msg.name}: </b>${msg.text}</li>`);

    }
  }

  else {
    return console.error(`bad message: ${msg}`);
  }

  //to the screen
  $('#messages').append(item);
};


/** called on error; logs it. */

ws.onerror = function (evt) {
  console.error(`err ${evt}`);
};


/** called on connection-closed; logs it. */

ws.onclose = function (evt) {
  console.log("close", evt);
};


/** send message when button pushed. */

$('form').submit(function (evt) {
  evt.preventDefault();

  let data = {type: "chat", text: $("#m").val()};
  ws.send(JSON.stringify(data));

  $('#m').val('');
});

