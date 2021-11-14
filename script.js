const todasMensagens = [];
const nomeInserido = "";

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
    nomeInserido = document.querySelector(".nomeTelaInicial")
    const name = {
        name: nomeInserido.value
    }

    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', name);

    promessa.then(autorizaNomeUsuario);
    promessa.catch(tratarErro);
}

function conexao(){
   nomeInserido = document.querySelector(".nomeTelaInicial")
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

    console.log(promessa);
    promessa.then(receberDados);
    promessa.catch(erroAoPegarMensagens);
}

function receberDados(resposta){
    console.log(resposta.data);
    mensagensDoServidor(resposta.data);
}

function mensagensDoServidor(mensagens){
    const tudo = document.querySelector(".conteudo");

    for (let i = 0; i< mensagens.length; i++) {
      if(mensagens[i].type === 'status'){
          tudo.innerHTML += ` 
            <div class="caixinhas entrou">
                <span><span class = "hora">(${mensagens[i].time}) </span><strong>${mensagens[i].from}</strong> entra na sala...</span>
            </div>`
      }else if(mensagens[i].type === 'message'){
        tudo.innerHTML += ` 
            <div class="caixinhas texto">
                <span><span class = "hora">(${mensagens[i].time}) </span><strong>${mensagens[i].from}</strong> ${mensagens[i].text} </span>
            </div>`
      } else if(mensagens[i].from === nomeInserido || mensagens[i].to === nomeInserido){
        tudo.innerHTML+= `
            <div class="caixinhas privada">
                <span><span class = "hora">(${mensagens[i].time}) </span><strong>${mensagens[i].from}</strong> ${mensagens[i].text} </span>
            </div>`
      }
    }

    
}

function erroAoPegarMensagens(){
    alert("Algo deu errado, recarregue a página e tente novamente");
}