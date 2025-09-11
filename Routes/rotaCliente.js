import { Router } from "express";
import ClienteController from "../Controllers/clienteController.js";

const clienteRouter = Router();
const clienteCtrl = new ClienteController();
clienteRouter.get("/", clienteCtrl.consultar)
.get("/:cpf", clienteCtrl.consultar)
.post("/", clienteCtrl.gravar)
.put("/:cpf", clienteCtrl.alterar)
.delete("/:cpf", clienteCtrl.excluir);

export default clienteRouter;
