const { lerProdutos, salvarProdutos } = require('./arquivo');

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}

function obterCategorias() {
  const produtos = lerProdutos();
  const categorias = produtos.map(p => p.categoria);
  return [...new Set(categorias)];
}

function adicionarProduto(produto) {
  const produtos = lerProdutos();
  produto.id = produtos.length + 1;
  produtos.push(produto);
  salvarProdutos(produtos);
}

function listarProdutos(categoriaFiltro = '') {
  let produtos = lerProdutos();
  let totalGeral = 0;

  if (categoriaFiltro) {
    const filtro = normalizarTexto(categoriaFiltro);
    produtos = produtos.filter(
      p => normalizarTexto(p.categoria) === filtro
    );
  }

  if (produtos.length === 0) {
    console.log('\nNenhum produto encontrado.');
    return;
  }

  const tabela = produtos.map(p => {
    const totalProduto = p.quantidade * p.preco;
    totalGeral += totalProduto;

    return {
      ID: p.id,
      'Nome do Produto': p.nome,
      Categoria: p.categoria,
      Quantidade: p.quantidade,
      'Preço Unitário': formatarMoeda(p.preco)
    };
  });

  console.table(tabela);
  console.log(`\nValor total dos produtos listados: ${formatarMoeda(totalGeral)}`);
}

function buscarProduto(termo) {
  const produtos = lerProdutos();
  const termoNorm = normalizarTexto(termo);

  const encontrados = produtos.filter(
    p =>
      p.id === Number(termo) ||
      normalizarTexto(p.nome).includes(termoNorm)
  );

  if (encontrados.length === 0) {
    console.log('\nProduto não encontrado.');
    return;
  }

  encontrados.forEach(p => {
    console.log(`
ID: ${p.id}
Nome: ${p.nome}
Categoria: ${p.categoria}
Quantidade: ${p.quantidade}
Preço: ${formatarMoeda(p.preco)}
Total em estoque: ${formatarMoeda(p.quantidade * p.preco)}
`);
  });
}

function atualizarProduto(id, novosDados) {
  const produtos = lerProdutos();
  const index = produtos.findIndex(p => p.id === Number(id));

  if (index === -1) {
    console.log('\nProduto não encontrado.');
    return;
  }

  produtos[index] = { ...produtos[index], ...novosDados };
  salvarProdutos(produtos);
  console.log('\nProduto atualizado com sucesso!');
}

function excluirProduto(id) {
  const produtos = lerProdutos();
  const index = produtos.findIndex(p => p.id === Number(id));

  if (index === -1) {
    console.log('\nProduto não encontrado.');
    return;
  }

  produtos.splice(index, 1);
  salvarProdutos(produtos);
  console.log('\nProduto excluído com sucesso!');
}

module.exports = {
  adicionarProduto,
  listarProdutos,
  buscarProduto,
  atualizarProduto,
  excluirProduto,
  obterCategorias
};
