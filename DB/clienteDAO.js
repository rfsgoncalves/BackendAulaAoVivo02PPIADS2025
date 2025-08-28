import Cliente from "../Models/Cliente.js";
import Cidade from "../Models/cidade.js";
import conectar from "./conexao.js";

export default class ClienteDAO {

    async gravar(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = "INSERT INTO cliente(cli_cpf, cli_nome, cli_sobrenome, cli_nomeUsuario, cli_cep, cid_id) VALUES (?,?,?,?,?,?)";
            const parametros = [
                cliente.cpf,
                cliente.nome,
                cliente.sobrenome,
                cliente.nomeUsuario,
                cliente.cep,
                cliente.cidade.id
            ];

            await conexao.execute(sql, parametros);
            await conexao.release(); //devolve a conexao para o pool
        }
    }

    async alterar(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = "UPDATE cliente SET cli_nome = ?, cli_sobrenome = ?, cli_nomeUsuario = ?, cli_cep = ?, cid_id = ? WHERE cli_cpf = ?";
            const parametros = [
                cliente.nome,
                cliente.sobrenome,
                cliente.nomeUsuario,
                cliente.cep,
                cliente.cidade.id,
                cliente.cpf,
            ];

            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = "DELETE FROM cliente WHERE cli_cpf = ?";
            const parametros = [cliente.cpf];

            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(){
        const conexao = await conectar();
        const sql = "SELECT * from Cliente cli INNER JOIN cidade cid ON cid.cid_id = cli.cid_id order by cli.cli_nome";
        const [registros] = await conexao.query(sql);
        await conexao.release();
        
        let listaClientes = [];
        for (const registro of registros){
            const cidade = new Cidade(registro.cid_id, registro.cid_nome, registro.cid_uf);
            const cliente = new Cliente(registro.cli_cpf, 
                                        registro.cli_nome, 
                                        registro.cli_sobrenome, 
                                        registro.cli_nomeUsuario, 
                                        registro.cli_cep, 
                                        cidade);

            listaClientes.push(cliente);
        }

        return listaClientes;


    }
}