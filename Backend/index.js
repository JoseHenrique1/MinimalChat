import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 8080 || 3000});

wss.on('connection', (ws)=>{
    console.log("client connected")
    
    ws.on('error', console.error);

    //ws.send("msg do servidor");

    ws.on('message', (data)=>{
        //console.log( data.toString())
        wss.clients.forEach((cliente)=>cliente.send(data.toString()))
    })
})