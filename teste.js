import Cliente from "./Models/cliente.js";
import Cidade from "./Models/cidade.js";


const cidade = new Cidade(0, "São Paulo", "SP");

//await cidade.gravar();
//console.log("Cidade gravada com sucesso.");
//console.log("A cidade recebeu o seguinte id:" + cidade.id);

const cliente = new Cliente("123.456.789-10", "Renato", "Goncalves", "renato", "12345-678", cidade);

await cliente.gravar();
console.log("Cliente gravado com sucesso.");
