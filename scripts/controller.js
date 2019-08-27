// Create a client instance
var btn_connect = document.getElementById("connect-btn");
var btn_publish = document.getElementById("publish-btn");
var pub_input = document.getElementById("input-publish");


client = new Paho.Client("broker.hivemq.com", 8000, "clientId");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// // connect the client
// client.connect({onSuccess:onConnect});

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("World");
//   message = new Paho.Message("Hello");
//   message.destinationName = "World";
//   client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
}

//add Event to button if click
btn_connect.addEventListener('click',function(e){
    e.preventDefault();
    // connect the client
    client.connect({onSuccess:onConnect});
    console.log("Successfully Connected");
})

//Submit Topic when click publish button
btn_publish.addEventListener('click',function(e){
    e.preventDefault();
    message = new Paho.Message(pub_input.value);
    message.destinationName = "World";
    client.send(message);
    console.log("Successfully Published");
})