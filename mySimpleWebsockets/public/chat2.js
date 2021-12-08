const ws = new WebSocket(`ws://localhost:3000/chat`);

form = document.querySelector("#msg-form");
form.addEventListener("submit", function(evt){
    event.preventDefault();

    msg = document.querySelector("#m").value
    console.log(`msg = ${msg}`);

})

