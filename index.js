"use strict";

var webSocket= new WebSocket("ws://localhost:5418");;
webSocket.onerror = function (error) {
  window.open("firewallet://");
  //reject("Err");
};

function requestAccounts() {
  return new Promise((resolve, reject) => {
    webSocket.onmessage = async (event) => {
      resolve(await new Response(event.data).text());
    };
    webSocket.send('{"method":"requestAccounts"}');
  });
}

function sendTransaction(obj) {
  if(window?.API?.AppInfo()!=undefined){
    obj.name=window.API.AppInfo()
  }else if(window.location.origin!=undefined){
    obj.name=window.location.origin
  }else{
    obj.name="Unknown App"
  }
  return new Promise((resolve, reject) => {
    webSocket.onmessage = async (event) => {
        resolve(await new Response(event.data).text());
      };
      webSocket.send(JSON.stringify(obj));
  });
}

module.exports = { requestAccounts, sendTransaction };