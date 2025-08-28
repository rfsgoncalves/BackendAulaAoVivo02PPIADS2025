import ClienteDAO from "../DB/clienteDAO.js";

export default class Cliente {

    //atributos privados da classe Cliente
    //# significa que o atributo é privado
    #cpf; //chave candidata
    #nome;
    #sobrenome;
    #nomeUsuario;
    #cep;
    #cidade;

    constructor(cpf = "", nome = "", sobrenome = "", nomeUsuario = "", cep = "", cidade = {}) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#sobrenome = sobrenome;
        this.#nomeUsuario = nomeUsuario;
        this.#cep = cep;
        this.#cidade = cidade; //relacionamento da classe cliente e cidade
    }
    //definir métodos de acesso públicos utilizando get e set
    

    get cpf() {
        return this.#cpf
    }

    set cpf(cpf) {
        this.#cpf = cpf
    }

    get nome() {
        return this.#nome
    }

    set nome(nome) {
        this.#nome = nome
    }

    get sobrenome() {
        return this.#sobrenome
    }

    set sobrenome(sobrenome) {
        this.#sobrenome = sobrenome
    }

    get nomeUsuario() {
        return this.#nomeUsuario
    }

    set nomeUsuario(nomeUsuario) {
        this.#nomeUsuario = nomeUsuario
    }

    get cep() {
        return this.#cep
    }

    set cep(cep) {
        this.#cep = cep
    }

    get cidade() {
        return this.#cidade
    }

    set cidade(cidade) {
        this.#cidade = cidade
    }

    //Escolher uma forma estruturada de representar um objeto do tipo cliente.
    toString() { //override do método da classe Pai
        return `
           CPF: ${this.#cpf}\n
           Nome Completo: ${this.#nome} ${this.#sobrenome}\n
           Nome de Usuário: ${this.#nomeUsuario}\n
           Cidade: ${this.#cidade}\n
           CEP: ${this.#cep}\n
        `;
    }

    //definir um formato que extrapola o ambiente de execução da aplicação
    //qdo for necessário enviar um cliente para a internet, nós vamos enviá-lo no formato JSON
    toJSON() {   // toJson <--- errado
        return {
            cpf: this.#cpf,
            nome: this.#nome,
            sobrenome: this.#sobrenome,
            nomeUsuario: this.#nomeUsuario,
            cidade: this.#cidade,
            cep: this.#cep
        }
    }

    async gravar(){
        const clienteDAO = new ClienteDAO();
        await clienteDAO.gravar(this);
    }

    async alterar(){
        const clienteDAO = new ClienteDAO();
        await clienteDAO.alterar(this);
    }

    async excluir(){
        const clienteDAO = new ClienteDAO();
        await clienteDAO.excluir(this);
    }

    async consultar(){
        const clienteDAO = new ClienteDAO();
        return await clienteDAO.consultar(this);   
    }

}