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

    async alterar(cidade){
        if (cidade instanceof Cidade) {
            const conexao = await conectar();
            const sql = "update cidade set cid_nome = ?, cid_uf = ? where cid_id = ?"
            await conexao.query(sql, [cidade.nome, cidade.uf, cidade.id])
            await conexao.release();
        }
    }

    async excluir(cidade){
        if (cidade instanceof Cidade) {
            const conexao = await conectar();
            const sql = "delete from cidade where cid_id = ?"
            await conexao.query(sql, [cidade.id])
            await conexao.release();
        }
    }

    async consultar(){
        const conexao = await conectar();
        const sql = "select * from cidade"
        const [linhas] = await conexao.query(sql)
        await conexao.release();
        return linhas.map(linha => new Cidade(linha.cid_id, linha.cid_nome, linha.cid_uf));
    }
}