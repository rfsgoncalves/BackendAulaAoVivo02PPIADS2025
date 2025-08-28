import CidadeDAO from "../DB/cidadeDAO.js";
export default class Cidade {
    #id;
    #nome;
    #uf;

    constructor(id = 0, nome="", uf="") {
        this.#id = id;
        this.#nome = nome;
        this.#uf = uf;  
    }
    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get nome() {
        return this.#nome;
    }

    set nome(nome) {
        this.#nome = nome;
    }

    get uf() {
        return this.#uf;
    }

    set uf(uf) {
        this.#uf = uf;
    }

    toString(){
        return `ID: ${this.#id}\nNome: ${this.#nome}\nUF: ${this.#uf}\n`;
    }

    toJSON(){
        return {
            id: this.#id,
            nome: this.#nome,
            uf: this.#uf
        }
    }

    async gravar(){
        const cidadeDAO = new CidadeDAO();
        await cidadeDAO.gravar(this);
    }

    async alterar(){
        const cidadeDAO = new CidadeDAO();
        await cidadeDAO.alterar(this);
    }

    async excluir(){
        const cidadeDAO = new CidadeDAO();
        await cidadeDAO.excluir(this);
    }

    async consultar(){
        const cidadeDAO = new CidadeDAO();
        return await cidadeDAO.consultar(this);
    }
}