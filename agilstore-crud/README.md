Projeto AgilStore
Exercício de Programação - 2026/01
Tema: Gerenciamento de Produtos para a Loja AgilStore

Resumo
Vamos ajudar a loja AgilStore? A empresa expandiu seu catálogo de produtos para incluir mais itens, atuando no segmento de tecnologia, desde smartphones e laptops até acessórios como cabos, carregadores e fones de ouvido.

Problema
Atualmente, o gerenciamento de produtos da loja é feito por meio de uma planilha controlada manualmente pelos funcionários. Com um grande volume de itens, esse método se torna ineficiente, tornando o controle de estoque propenso a erros — especialmente em relação à agilidade, atualizações rápidas ou buscas específicas.

Objetivo
Desenvolver uma aplicação que permita a gestão automatizada do inventário de produtos, facilitando operações como adicionar novos itens, listar produtos existentes, atualizar informações e remover itens obsoletos.
Trata-se essencialmente de um sistema CRUD (Create, Read, Update, Delete), o que simplifica a estruturação do projeto.

Tecnologias Utilizadas

- JavaScript
- Node.js
- Leitura e escrita de arquivos JSON
- Interação via terminal

Estrutura do Projeto

agilstore-crud/
│
├── index.js              # Arquivo principal (menu e fluxo do sistema)
├── src/
│   ├── produtos.js       # Regras de negócio e operações CRUD
│   └── arquivo.js        # Leitura e escrita do arquivo JSON
|
├── data/
│   └── produtos.json     # Persistência dos dados
│
└── README.md             # Documentação do projeto

Funcionalidades Implementadas

-  Adicionar Produto

Cadastro de produto com:
Nome
Categoria (selecionada a partir de opções pré-definidas)
Quantidade em estoque
Preço
Validação de entradas
Opção de voltar ao menu durante o processo

- Listar Produtos

Exibição dos produtos em formato de tabela

Opção de:

Listar todos os produtos
Filtrar por categoria
Cálculo do valor total dos produtos listados

- Buscar Produto

Busca por:

ID
Nome ou parte do nome
Normalização de texto para evitar problemas com acentuação
Exibição completa dos dados do produto encontrado
Mensagem adequada caso não seja encontrado
Atualizar Produto
Atualização de produto a partir do ID
Verificação da existência do produto
Possibilidade de atualizar apenas os campos desejados
Validação dos novos dados antes de salvar

- Excluir Produto

Exclusão de produto por ID
Confirmação da ação com o usuário
Opção de cancelar e retornar ao menu

- Persistência de Dados

Os dados dos produtos são armazenados em um arquivo JSON, garantindo que as informações não sejam perdidas ao encerrar a aplicação.
Essa abordagem foi escolhida por ser adequada ao nível acadêmico do projeto, evitando a complexidade de um banco de dados relacional.

Como Executar o Projeto?

Pré-requisitos: Node.js precisa estar instalado

Passo a Passo

-> Clone o repositório:
git clone <https://github.com/Perecila-Oliveira/agilstore-crud>
-> Acesse a pasta do projeto:
cd agilstore-crud
-> executar a aplicação via terminal 
node index.js

Decisões de Projeto

Utilização de Node.js para permitir execução via terminal
Separação de responsabilidades em módulos
Uso de arquivo JSON como persistência de dados
Implementação de validações e opções de retorno para melhor experiência do usuário

Conclusão

O projeto atende a todos os requisitos propostos no enunciado, implementando um sistema CRUD funcional, organizado e documentado. A aplicação pode ser facilmente expandida no futuro para utilização de banco de dados ou interface gráfica.