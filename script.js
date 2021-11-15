const todasMensagens = [];
let nomeInserido = "";

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

function display(clicado){
    
}

function pegarNome(){
    nomeInserido = document.querySelector(".nomeTelaInicial").value;
    const name = {
        name: nomeInserido
    }

    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', name);

    promessa.then(autorizaNomeUsuario);
    promessa.catch(tratarErro);
}

function conexao(){
   nomeInserido = document.querySelector(".nomeTelaInicial").value
    const name = {
        name: nomeInserido
    }

    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', name);
    promessa.catch(desconexao);
}

function manterConexao(){
    setInterval(conexao, 5000);
}

function desconexao(){
    alert("Devido ao tempo ocioso, você foi desconectado do servidor!");
    const mensagemDesconexao = {
        from: nomeInserido,
        to: 'Todos',
        text: "Saiu da sala...",
        type: 'message'
    }

    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', mensagemDesconexao);
    return promessa;
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

    promessa.then(receberDados);
    promessa.catch(erroAoPegarMensagens);
}

function atualizarChat(){

}

function receberDados(resposta){
    mensagensDoServidor(resposta.data);
}

function mensagensDoServidor(mensagens){
    const tudo = document.querySelector(".conteudo");

    for (let i = 0; i< mensagens.length; i++) {
      if(mensagens[i].type === 'status'){
          tudo.innerHTML += ` 
            <div class="caixinhas entrou" data-identifier="message">
                <span><span class = "hora">(${mensagens[i].time}) </span><strong>${mensagens[i].from}</strong> entra na sala...</span>
            </div>`
      }else if(mensagens[i].type === 'message'){
        tudo.innerHTML += ` 
            <div class="caixinhas texto" data-identifier="message">
                <span><span class = "hora">(${mensagens[i].time}) </span><strong>${mensagens[i].from}</strong> ${mensagens[i].text} </span>
            </div>`
      } else if(mensagens[i].from === nomeInserido || mensagens[i].to === nomeInserido){
        tudo.innerHTML+= `
            <div class="caixinhas privada" data-identifier="message">
                <span><span class = "hora">(${mensagens[i].time}) </span><strong>${mensagens[i].from}</strong> ${mensagens[i].text} </span>
            </div>`
      } else if(mensagens[i].text === "Saiu da Sala..." || desconexao === 200){
        tudo.innerHTML += ` 
        <div class="caixinhas entrou" data-identifier="message">
            <span><span class = "hora">(${mensagens[i].time}) </span><strong>${mensagens[i].from}</strong> Saiu da sala...</span>
        </div>`
      }
    }
    scrollMensagem();
}

function scrollMensagem(){
    const ultimaMensagem = document.querySelector(".conteudo").lastChild
    ultimaMensagem.scrollIntoView();
}

function erroAoPegarMensagens(){
    alert("Algo deu errado, recarregue a página e tente novamente");
}

function enviarMensagens(){
    const mensagemInput = document.querySelector(".mensagemDigitada");
    const mensagemDigitada = {
        from: nomeInserido,
        to: 'Todos',
        text: mensagemInput.value,
        type: 'message'
    }

    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', mensagemDigitada);
    promessa.then(buscarMensagens);
    promessa.catch(naoFoiPossivelEnviar);
}

function naoFoiPossivelEnviar(){
    alert("Mensagem não enviada, você se desconectou");
    window.location.reload()
}

function enviou(){
    alert("mensagem enviada");
}