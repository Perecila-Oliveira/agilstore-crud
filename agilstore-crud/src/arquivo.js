const fs = require('fs');
const path = require('path');

const caminhoArquivo = path.join(__dirname, '../data/produtos.json');

function lerProdutos() {
  const dados = fs.readFileSync(caminhoArquivo, 'utf8');
  return JSON.parse(dados);
}

function salvarProdutos(produtos) {
  const dados = JSON.stringify(produtos, null, 2);
  fs.writeFileSync(caminhoArquivo, dados);
}

module.exports = {
  lerProdutos,
  salvarProdutos
};
