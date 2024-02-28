import chalk from "chalk";
import fs from "fs";
import pegaArguivo from "./index.js";
import listaValidada from "./http-validacao.js";

const caminho = process.argv;

 async function imprimiLista(valida, resultado, identificador = '') {
    if(valida) {
        console.log(
            chalk.yellow("lista Validada"),
            chalk.blue.bgGreen(identificador)
            , await listaValidada(resultado));
    } else {
        console.log(
          chalk.yellow("lista de links"),
          chalk.blue.bgGreen(identificador)
          , resultado);
    }
}

async function processaTexto(argumentos) {
  const caminho = argumentos[2];
  const valida = argumentos[3] === '--valida';

  try {
    fs.lstatSync(caminho);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(chalk.red("arquivo ou diretorio Não existente"));
      return;
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const resultado = await pegaArguivo(argumentos[2]);
    imprimiLista(valida, resultado);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (nomeDeArquivo) => {
       const identificador = nomeDeArquivo
      const lista = await pegaArguivo(`${caminho}/${nomeDeArquivo}`);
      imprimiLista(valida, lista, identificador);
    });
  }
}
processaTexto(caminho);
