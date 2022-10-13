let data = new Date()
let ano = data.getFullYear()

const limparFormulario = (endereco) => {
    document.getElementById('logradouro').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('uf').value = '';
}

const preencherFormulario = (endereco) => {
    document.getElementById('logradouro').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('uf').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async () => {
    limparFormulario();

    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)) {
        //A API fetch provê ao navegador uma interface para a execução de requisições HTTP através de Promises.
        const dados = await fetch(url);
        //await estou pedindo para ele aguardar o metódo json
        const endereco = await dados.json();
        //Aqui estou usando a propriedade .HasOwproperty para saber se o endereço recebeu um ERRO
        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = 'CEP não encontrado!';
        } else {
            preencherFormulario(endereco);
        }
    } else {
        document.getElementById('endereco').value = 'CEP incorreto!';
    }

}

document.getElementById('cep')
    .addEventListener('focusout', pesquisarCep);

document.getElementById("data").innerHTML = "prof. Astarote - " + ano