 // BONUS: BUSCAR LISTA DE PARTICIPANTES;
 // VARIAVEIS GLOBAIS
let NickName;
let membros = [];
let mensagensdochat = [];
let mensagemdigitada = '';
let mensagemformatada='';

const form = document.querySelector('.form');
const input = document.querySelector('.menssager');

// Perguntar nome de usuario
const pedirnome = () => {
    NickName = prompt('Ola usuario,voce precisa se identificar para entrar,qual o seu NickName?');

}
pedirnome();

// Nickname formatado do usuario
const nickformatado = {
    name:`${NickName}`
}

//  se o servidor enviar a resposta
const enviarmembro = (resposta) => {
    const promesssa2 = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nickformatado);
    promesssa2.then(deutudocerto); // sucesso
    promesssa2.catch(deutudoerrado); // erro

    membros = resposta.data;
}


// se der erro ao enviar enviar a resposta
const membroerro = (erro) => {
    alert('Puts,que azar o seu, o servidor não esta funcionando');
     console.log(erro);
    }


const deutudocerto = () => {
    
}

const deutudoerrado = (err) => {
    if(err.response.status === 400){
    const statusCode = err.response.status;
    alert('O nome digitado já esta sendo utilizado,tente novamente');
    NickName = "";
    pedirnome();
}
  }


function atualizandochat() {
    const promessaatt = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nickformatado);
    promessaatt.then(atualizar); // sucesso
    promessaatt.catch(erratt); // erro
}


setInterval(atualizandochat, 5000);

const erratt = (er) => {
    alert('Puts,erro ao atualizar o seu nickname');
}

const atualizar = (re) => {
    console.log('Sucesso');
    
}

const popularMensagens = (mensagens) => {
    let ListaMensagens = mensagens.data;
    let ul = document.querySelector('.conteiner');
    let carregar = '';
    for(i = 0; i < ListaMensagens.length;i++){
        if(ListaMensagens[i].type=="status"){
            ul.innerHTML = carregar += `<li>
            <div class="mensagem entrou">
                <h1><span class="horario">${ListaMensagens[i].time} </span><span class="usuario">${ListaMensagens[i].from} </span>${ListaMensagens[i].text} </h1>
            </div>
        </li>`
        }else if(ListaMensagens[i].type=="message"){
            ul.innerHTML = carregar += `<li>
            <div class="mensagem normal">
                <h1><span class="horario">${ListaMensagens[i].time} </span><span class="usuario">${ListaMensagens[i].from} </span>para <span class="usuario">${ListaMensagens[i].to}</span> ${ ListaMensagens[i].text } </h1>
            </div>
        </li>`
        }else if (ListaMensagens[i].to === NickName){
            ul.innerHTML.private_message = carregar += `<li>
            <div class="mensagem reservado">
                <h1><span class="horario">${ListaMensagens[i].time} </span><sp an class="usuario">${ListaMensagens[i].from} </span> reservadamente para <span class="usuario">${ListaMensagens[i].to} </span> ${ListaMensagens[i].text}</h1>
            </div>
        </li>`
        }
}
}



function recebermensagemErro(erroo) {
    alert('Puts,erro ao receber mensagem');
    console.log(erroo);
}

// BONUS: BUSCAR LISTA DE PARTICIPANTES;
const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants') 
promessa.then(enviarmembro); // sucesso
promessa.catch(membroerro);  // Error
 
// FUNÇÃ
const scrollarmensagens = () => {
    let ultimamensagem = document.querySelector('.conteiner').lastElementChild;
    ultimamensagem.scrollIntoView( {block: "end", inline: "nearest"});
}

setInterval(scrollarmensagens, 1000);



// BUSCAR MENSAGENS DO CHAT

function ResetarMensagens() {
    const promessachat = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessachat.then(popularMensagens); // sucesso
    promessachat.catch(recebermensagemErro); // erro


}

setInterval(ResetarMensagens, 3000);



function recebermensagem() {
    mensagemdigitada = input.value;
    mensagemformatada = {
    from: NickName,
    to: "Todos",
    text: mensagemdigitada,
    type: "message"
};
    const promessam = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagemformatada);
    promessam.then(deucertoooo); // sucesso
    promessam.catch(recebermensagemErro); // erro
    console.log('eu sou a variavel mensagem formatada: ', mensagemformatada);
}


function deucertoooo() {
    input.value = "";
}