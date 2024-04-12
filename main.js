function apagar(id){
    
    console.log("apagando id :" + id)
    fetch("http://localhost:3000/nomes/" + id, {
    method : "DELETE"
    }).then(Response => Response.json()).
    then(dados => console.log(dados)).
    then((json) => window.location.reload())
}
function adicionar(e){
    e.preventDefault()

    const data = new FormData(e.target);

    const nome = data.get('nome');
    const idade = data.get('idade');
    const email = data.get('email');

    console.log("enviando dados ...")

    fetch("http://localhost:3000/nomes/", {
        method :'POST',
        body : JSON.stringify({
            nome : nome,
            idade : idade,
            email : email,
        }),
        headers: {
            'content-type': 'application/json' ,
        }
    }).then((Response) => Response.json()).
    then((json) => window.location.reload())
}

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM completamente carregado e analisado");

    document.getElementById("meuForm").addEventListener('submit' , adicionar)

    fetch("http://localhost:3000/nomes").
    then(Response => Response.json()).
    then(dados => {
    var users = dados.map(user => "<div></p>Nome : " + user.nome + "</br>Idade : " + user.idade + "</br>Email : " + user.email + "</br> </p> <button onClick=apagar(\"" + user.id + "\")>apagar</button></div>").join('')
    document.getElementById("userCards").innerHTML = users

    //console.log(users)
}).
    catch (erro => console.log(erro))
  });
