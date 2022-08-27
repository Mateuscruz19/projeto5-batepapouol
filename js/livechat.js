// VARIAVEIS GLOBAIS
let NickName;
let membros = [];

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
     console.log(erro.response);
    }


const deutudocerto = (resposta) => {
    alert('deu tudo certo irmao');   
}

const deutudoerrado = (erro) => {
    alert('deu tudo errado irmao');
}


const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants') 
promessa.then(enviarmembro); // sucesso
promessa.catch(membroerro) // erro
