process.env.FORCE_COLOR = '0';
const readline = require('readline');
const {
  adicionarProduto,
  listarProdutos,
  buscarProduto,
  atualizarProduto,
  excluirProduto,
  obterCategorias
} = require('./src/produtos');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function mostrarMenu() {
  console.log('\n=== AgilStore ===');
  console.log('1 - Adicionar Produto');
  console.log('2 - Listar Produtos');
  console.log('3 - Atualizar Produto');
  console.log('4 - Excluir Produto');
  console.log('5 - Buscar Produto');
  console.log('0 - Sair');

  rl.question('Opção: ', tratarOpcao);
}

function tratarOpcao(opcao) {
  switch (opcao) {
    case '1': adicionarProdutoMenu(); break;
    case '2': listarProdutosMenu(); break;
    case '3': atualizarProdutoMenu(); break;
    case '4': excluirProdutoMenu(); break;
    case '5': buscarProdutoMenu(); break;
    case '0':
      console.log('Sistema Encerrado.');
      rl.close();
      break;
    default:
      console.log('Opção inválida.');
      mostrarMenu();
  }
}

function adicionarProdutoMenu() {
  rl.question('Nome do produto (0 para voltar): ', nome => {
    if (nome === '0') return mostrarMenu();

    const categorias = obterCategorias();

    if (categorias.length > 0) {
      console.log('\nCategorias existentes:');
      categorias.forEach((c, i) => console.log(`${i + 1} - ${c}`));
      console.log('5 - Criar nova categoria');
    }

    rl.question('Escolha a categoria (0 para voltar): ', escolha => {
      if (escolha === '0') return mostrarMenu();

      let categoria;

      if (categorias.length === 0 || escolha === '0') {
        rl.question('Nova categoria (0 para voltar): ', nova => {
          if (nova === '0') return mostrarMenu();
          categoria = nova;
          continuarCadastro(nome, categoria);
        });
      } else {
        categoria = categorias[Number(escolha) - 1];
        if (!categoria) {
          console.log('Categoria inválida.');
          return mostrarMenu();
        }
        continuarCadastro(nome, categoria);
      }
    });
  });
}

function continuarCadastro(nome, categoria) {
  rl.question('Quantidade (0 para voltar): ', quantidade => {
    if (quantidade === '0') return mostrarMenu();

    rl.question('Preço (ex: 3895,89 | 0 para voltar): ', preco => {
      if (preco === '0') return mostrarMenu();

      adicionarProduto({
        nome,
        categoria,
        quantidade: Number(quantidade),
        preco: Number(preco.replace(',', '.'))
      });

      console.log('Produto adicionado com sucesso!');
      mostrarMenu();
    });
  });
}

function listarProdutosMenu() {
  rl.question('Filtrar por categoria? (s/n ou 0 para voltar): ', resposta => {
    if (resposta === '0') return mostrarMenu();

    if (resposta.toLowerCase() === 's') {
      rl.question('Categoria (0 para voltar): ', categoria => {
        if (categoria === '0') return mostrarMenu();
        listarProdutos(categoria);
        mostrarMenu();
      });
    } else if (resposta.toLowerCase() === 'n') {
      listarProdutos();
      mostrarMenu();
    } else {
      console.log('Resposta inválida.');
      listarProdutosMenu();
    }
  });
}

function buscarProdutoMenu() {
  rl.question('Digite ID ou nome (0 para voltar): ', termo => {
    if (termo === '0') return mostrarMenu();
    buscarProduto(termo);
    mostrarMenu();
  });
}

function atualizarProdutoMenu() {
  rl.question('ID do produto (0 para voltar): ', id => {
    if (id === '0') return mostrarMenu();

    rl.question('Novo nome (0 para voltar): ', nome => {
      if (nome === '0') return mostrarMenu();

      rl.question('Nova categoria (0 para voltar): ', categoria => {
        if (categoria === '0') return mostrarMenu();

        rl.question('Quantidade (0 para voltar): ', quantidade => {
          if (quantidade === '0') return mostrarMenu();

          rl.question('Preço (0 para voltar): ', preco => {
            if (preco === '0') return mostrarMenu();

            atualizarProduto(id, {
              nome,
              categoria,
              quantidade: Number(quantidade),
              preco: Number(preco.replace(',', '.'))
            });

            mostrarMenu();
          });
        });
      });
    });
  });
}

function excluirProdutoMenu() {
  rl.question('ID do produto (0 para voltar): ', id => {
    if (id === '0') return mostrarMenu();

    rl.question('Confirmar exclusão? (s/n ou 0 para voltar): ', r => {
      if (r === '0') return mostrarMenu();

      if (r.toLowerCase() === 's') {
        excluirProduto(id);
      } else {
        console.log('Exclusão cancelada.');
      }
      mostrarMenu();
    });
  });
}

mostrarMenu();
