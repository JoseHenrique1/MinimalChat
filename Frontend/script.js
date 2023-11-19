let boxLogin = document.querySelector(".box-login");
let boxMsgs = document.querySelector('.box-msgs');
let templateChat = document.querySelector('.templateChat');

templateChat.classList.add('d-none')

let websocket;
let usuario = {
    id : 0,
    nome : "",
    color : "",
};

function createMessage(id, nome, msg) {
    let msg_div = document.createElement('div');
    let div = document.createElement('div');
    let p_nome = document.createElement('p');
    p_nome.innerText = nome;
    let p_msg = document.createElement('p');
    p_msg.innerText = msg;

    div.append(p_nome, p_msg);
    msg_div.append(div)
    id == usuario.id? msg_div.setAttribute('class', 'msg mymsg'): msg_div.setAttribute('class', 'msg')
    return msg_div;
}

function scrolMove() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}

let msgs = document.querySelector("#msgs");

const handleReceiveMessage = (e)=> {
    let res  = JSON.parse(e.data)
    let message = createMessage(res.id, res.nome, res.msg)
    console.log(e.data);
    msgs.appendChild(message);
    scrolMove()
}

const handleLogin = (e) => {
    e.preventDefault();

    usuario.id = Math.random();
    usuario.nome = e.target.usuario.value;

    boxLogin.classList.add('d-none');
    templateChat.classList.remove('d-none')

    websocket = new WebSocket("ws://localhost:8080");
    websocket.onmessage = handleReceiveMessage;
}

const handleSendMessage = (e)=>{
    e.preventDefault();
    let msg = e.target.msg.value;
    websocket.send(
        JSON.stringify({...usuario, msg: msg})
    )
    scrolMove()
}

document.querySelector('.form-login').addEventListener('submit', handleLogin)
document.querySelector('.form-msgs').addEventListener('submit', handleSendMessage)


