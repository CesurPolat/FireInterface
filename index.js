"use strict";
import { ethers } from "ethers";

var webSocket;
webSocket = new WebSocket("ws://localhost:5418");
webSocket.onerror = function (error) {
  window.open("firewallet://");
  reject("Err");
};

function requestAccounts() {
  return new Promise((resolve, reject) => {
    webSocket.onmessage = async (event) => {
      resolve(await new Response(event.data).text());
    };
    webSocket.onopen = (event) => {
      webSocket.send('{"method":"requestAccounts"}');
    };
  });
}

function sendTransaction(obj) {
  return new Promise((resolve, reject) => {
    webSocket.onmessage = async (event) => {
        console.log(event.data);
        resolve(await new Response(event.data).text());
      };
      webSocket.onopen = (event) => {
        webSocket.send(obj);
      };
  });
}

module.exports = { requestAccounts, sendTransaction, ethers };
