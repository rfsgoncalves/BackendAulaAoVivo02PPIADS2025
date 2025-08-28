import Cidade from "../Models/cidade.js";
import conectar from "./conexao.js";
export default class CidadeDAO{

    async gravar(cidade){
        if (cidade instanceof Cidade) {
            const conexao = await conectar();
            const sql = "insert into cidade(cid_nome, cid_uf) values (?, ?)"
            const [resultados] = await conexao.query(sql, [cidade.nome, cidade.uf])
            await conexao.release();
            cidade.id = resultados.insertId;
        }
    }

    async alterar(){}

    async excluir(){}

    async consultar(){}
}