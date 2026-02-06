import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import handlebars from "express-handlebars";
import Materiais from "./models/Materiais.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// arquivos estáticos (CSS)
app.use(express.static(path.join(__dirname, "public")));

// CONFIGURANDO HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// PÁGINA PRINCIPAL
app.get("/", async (req, res) => {
  const materiais = await Materiais.findAll({ raw: true });
  res.render("index", { materiais });
});

// CRIAR
app.post("/materiais", async (req, res) => {
  const { produto, quantidade, destino } = req.body;

  await Materiais.create({ produto, quantidade, destino });
  res.redirect("/");
});

// EXCLUIR
app.post("/materiais/excluir/:id", async (req, res) => {
  await Materiais.destroy({
    where: { id: req.params.id }
  });

  res.redirect("/");
});

//Editar dados 
app.get( "/materiais/editar/:id",async(req,res) =>{
  const material= await Materiais.findByPk(req.params.id, {raw: true});
  res.render("editar", {material});
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
// SALVAR EDIÇÃO
app.post("/materiais/editar/:id", async (req, res) => {
  const { produto, quantidade, destino } = req.body;

  await Materiais.update(
    { produto, quantidade, destino },
    { where: { id: req.params.id } }
  );

  res.redirect("/");
});

