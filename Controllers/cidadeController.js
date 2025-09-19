import Cidade from "../Models/cidade.js"
export default class CidadeController{

    gravar(req, res){
        if (req.method === "POST" && req.is("application/json")) {
            const { nome, uf } = req.body;
            if (nome && uf) {
                const cidade = new Cidade(0, nome, uf);
                cidade.gravar().then(() => {
                    res.status(200).json({ status: true, mensagem: "Cidade gravada com sucesso" });
                }).catch(erro => {
                    res.status(500).json({ status: false, mensagem: "Erro ao gravar cidade", erro: erro.message });
                })
            }
            else{
                res.status(400).json({ status: false, mensagem: "Nome e UF são obrigatórios" });
            }
        }
        else{
            res.status(400).json({ status: false, mensagem: "Requisição inválida" });
        }
    }
    alterar(req, res){
        if ((req.method === "PUT" || req.method === "PATCH") && req.is("application/json")) {
            const  id  = req.params.id;
            const { nome, uf } = req.body;
            if (id && nome && uf) {
                const cidade = new Cidade(id, nome, uf);
                cidade.alterar().then(() => {
                    res.status(200).json({ status: true, mensagem: "Cidade alterada com sucesso" });
                }).catch(erro => {
                    res.status(500).json({ status: false, mensagem: "Erro ao alterar cidade", erro: erro.message });
                })
            }
            else{
                res.status(400).json({ status: false, mensagem: "ID, Nome e UF são obrigatórios" });
            }
        }
        else{
            res.status(400).json({ status: false, mensagem: "Requisição inválida" });
        }
    }
    excluir(req, res){
        if (req.method === "DELETE" && req.is("application/json")) {
            const { id } = req.params.id;
            if (id) {
                const cidade = new Cidade(id, "", "");    
                cidade.excluir().then(() => {
                    res.status(200).json({ status: true, mensagem: "Cidade excluída com sucesso" });
                }).catch(erro => {
                    res.status(500).json({ status: false, mensagem: "Erro ao excluir cidade", erro: erro.message });
                })
            }
            else{
                res.status(400).json({ status: false, mensagem: "ID é obrigatório" });  
            }
        }
        else{
            res.status(400).json({ status: false, mensagem: "Requisição inválida" });
        }
                
    }
    consultar(req, res){
        if (req.method === "GET") {
            const cidade = new Cidade();
            cidade.consultar().then(cidades => {
                res.status(200).json({status: true, mensagem: "Cidades consultadas com sucesso", cidades: cidades});
            }).catch(erro => {
                res.status(500).json({ status: false, mensagem: "Erro ao consultar cidades", erro: erro.message });
            })
        }
        else{
            res.status(400).json({ status: false, mensagem: "Requisição inválida" });
        }
    }
}