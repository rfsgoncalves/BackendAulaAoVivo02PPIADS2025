import Cliente from "../Models/cliente.js";
export default class ClienteController {

    //os métodos não são assíncronos
    //Esses métodos irão traduzir requisições HTTP em ações internas da aplicação
    //e irão retornar respostas HTTP

    //HTTP POST
    gravar(requisicao, resposta) {
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            if (dados.cpf && dados.nome && dados.sobrenome && dados.nomeUsuario && dados.cep && dados.cidade) {
                const cliente = new Cliente(dados.cpf, dados.nome, dados.sobrenome, dados.nomeUsuario, dados.cep, dados.cidade);
                cliente.gravar()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Cliente gravado com sucesso"
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao gravar o cliente: " + erro.message
                        });
                    }); //é um método assíncrono
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados do cliente (CPF, Nome, Sobrenome, Nome de Usuário, CEP e Cidade)"
                });
            }
        }    
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    //HTTP PUT
    alterar(requisicao, resposta) {
        if ((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is("application/json")) {
            const dados = requisicao.body;
            //http://localhost:4000/cliente/123.456.789-00
            const cpf = requisicao.params.cpf; //cpf ser informado na url


            if (cpf && dados.nome && dados.sobrenome && dados.nomeUsuario && dados.cep && dados.cidade) {
                const cliente = new Cliente(cpf, dados.nome, dados.sobrenome, dados.nomeUsuario, dados.cep, dados.cidade);
                cliente.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Cliente atualizado com sucesso"
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao atualizar o cliente: " + erro.message
                        });
                    }); //é um método assíncrono
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados do cliente (Nome, Sobrenome, Nome de Usuário, CEP e Cidade). O cpf deve ser informado na url."
                });
            }
        }    
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    };

    //HTTP DELETE
    excluir(requisicao, resposta) { 
        if (requisicao.method === "DELETE"){
            const cpf = requisicao.params.cpf;
            if (cpf){
                const cliente = new Cliente();
                cliente.consultarCPF(cpf)
                .then((listaClientes) => {
                    const cliente = listaClientes[0];
                    if (cliente){
                        cliente.excluir()
                        .then(() => {
                            resposta.status(200).json({
                                status: true,
                                mensagem: "Cliente excluido com sucesso"
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                status: false,
                                mensagem: "Erro ao excluir o cliente: " + erro.message
                            });
                        });
                    }
                    else{
                        resposta.status(404).json({
                            status: false,
                            mensagem:"Cliente não encontrado"
                        });
                    }
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao consultar o cliente para exclusão: " + erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o CPF do cliente"
                });
            }

        }
        else{
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    };

    //HTTP GET
    consultar(requisicao, resposta) { 
        if (requisicao.method === "GET"){
            //a consulta pode ou não especificar um cpf 
            //qdo um cpf não for especificado então a consulta retornará todos os clientes
            const cpf = requisicao.params.cpf;
            const cliente = new Cliente();
            if (cpf){
                cliente.consultarCPF(cpf)
                .then((listaClientes)=>{
                    if (listaClientes.length > 0) {
                        resposta.status(200).json({
                            status:true,
                            mensagem: "Consulta realizada com sucesso",
                            clientes: listaClientes
                        });
                    }
                    else{
                        resposta.status(404).json({
                            status: false,
                            mensagem:"Cliente nao encontrado"
                        });
                    }
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao consultar o cliente: " + erro.message
                    });
                });
            }
            else{
                cliente.consultar()
                .then((listaClientes)=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Consulta realizada com sucesso",
                        clientes: listaClientes
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao consultar os clientes: " + erro.message
                    });
                });
                
            }

        }
        else{
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }

    };
}