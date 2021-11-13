function menuContatosAparece(){
    const menuAparece = document.querySelector(".menuContatos");
    menuAparece.classList.remove("none");
}

function menuContatosDesaparece(){
    const menuDesaparece = document.querySelector(".menuContatos");
    menuDesaparece.classList.add("none");
}

function colocaNone(){
    const elemento = document.querySelector(".telaInicial");
    elemento.classList.add("none");
}

function pegarNome(){
    const nomeInserido = document.querySelector(".nomeTelaInicial")
    const name = {
        name: nomeInserido.value
    }

    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', name);

    promessa.then(autorizaNomeUsuario);
    promessa.catch(tratarErro);
}

function conexao(){
    const nomeInserido = document.querySelector(".nomeTelaInicial")
    const name = {
        name: nomeInserido.value
    }

    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', name);
}

function manterConexao(){
    setInterval(conexao, 5000);
}

function autorizaNomeUsuario(resposta){
    alert("Nome de usuário aceito");
    colocaNone();
    manterConexao();
    buscarMensagens();
}

function tratarErro(erro){

    const statusCode = erro.response.status;

    if(statusCode === 400){
        alert("Nome inválido, tente outro");
        const nomeInserido = document.querySelector(".nomeTelaInicial")
        nomeInserido.value = "";
    }
}

function buscarMensagens(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');


}