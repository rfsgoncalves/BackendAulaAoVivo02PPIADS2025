const { Router } from "express";
import CidadeController from "../Controllers/cidadeController.js";

const cidadeRouter = Router();
const cidadeCtrl = new CidadeController();
cidadeRouter.get("/", cidadeCtrl.consultar)
.get("/:id", cidadeCtrl.consultar)
.post("/", cidadeCtrl.gravar)
.put("/:id", cidadeCtrl.alterar)
.delete("/:id", cidadeCtrl.excluir);

export default cidadeRouter;