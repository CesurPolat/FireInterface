function requestAccounts() {
    return new Promise((resolve, reject) => {
        webSocket = new WebSocket("ws://localhost:5418");
        webSocket.onerror = function (error) {
            window.open("firewallet://")
            reject("Err")
        };
        webSocket.onmessage = async (event) => {
            resolve(await new Response(event.data).text())
        };
        webSocket.onopen = (event) => {
            webSocket.send('{"method":"requestAccounts"}')
        };
    })
}
