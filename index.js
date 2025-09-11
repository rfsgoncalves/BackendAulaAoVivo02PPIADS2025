import express from 'express';
import clienteRouter from './Routes/rotaCliente.js';

const hostname = '0.0.0.0';
const porta = 4000;

const app = express();
//configurar o servidor para receber dados no formato json

app.use(express.json()); //camada que sabe tratar os dados no formato json

app.use("/cliente", clienteRouter); //camada que sabe atender requisições no endpoint cliente

app.listen(porta, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${porta}`);
});