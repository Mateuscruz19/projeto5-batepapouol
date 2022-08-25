const input = document.querySelector('.inputlogin');
const button = document.querySelector('.botaologin');
const form = document.querySelector('.form');


// Validar nome de usuário ser valido
const validarNome = ({ target }) => {
    if (target.value.length > 3) {
        button.removeAttribute('disabled');
        return
    } 
         button.setAttribute('disabled', true);
    }
   

    // SALVAR NO LOCAL HOST O NOME DE USUARIO
const salvarNome = (event) => {
event.preventDefault();
localStorage.setItem('nome', input.value);
window.location = '/html/chat.html';
}

input.addEventListener('input', validarNome);
form.addEventListener('submit', salvarNome);
