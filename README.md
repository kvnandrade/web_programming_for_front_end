# Rick and Morty Universe

Website moderno e responsivo sobre **Rick and Morty**, desenvolvido com **HTML, CSS e JavaScript puro**, consumindo dados em tempo real da API pública Rick and Morty.

## Objetivo do projeto

Criar uma página web profissional que apresente informações sobre a série e carregue cards de personagens dinamicamente por meio da API:

```text
https://rickandmortyapi.com/api/character
```

O projeto foi pensado para demonstrar fundamentos essenciais de Front-End:

- estrutura semântica com HTML;
- design moderno com CSS;
- responsividade com Flexbox, Grid e media queries;
- consumo de API com `fetch()` e `async/await`;
- manipulação do DOM com `createElement()` e `appendChild()`;
- filtros por nome e status;
- loading, mensagens de erro e feedback visual.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript puro
- Rick and Morty API

Nenhuma biblioteca externa foi utilizada. O projeto não usa React, Vue, Angular, Bootstrap ou frameworks CSS.

## Estrutura dos arquivos

```text
/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── portal.svg
└── README.md
```

## O que faz cada arquivo

### `index.html`

Contém a estrutura da página:

- header com logo textual e menu de navegação;
- banner principal com imagem, texto e botões;
- seção sobre a série;
- seção de personagens com campo de pesquisa, filtro de status, loading, mensagem de erro e um container vazio;
- seção com informações da API;
- footer com créditos e link da API.

Importante: os cards dos personagens **não existem previamente no HTML**. O arquivo possui apenas:

```html
<div class="cards-grid" id="characters-container" aria-live="polite"></div>
```

Esse container vazio recebe os cards criados pelo JavaScript.

### `css/style.css`

Responsável pelo visual do site:

- layout moderno com cores inspiradas em ficção científica;
- organização com Flexbox e CSS Grid;
- responsividade para tablets e celulares;
- menu mobile;
- cards com hover effects;
- loading animado;
- animações suaves;
- scroll suave;
- boas práticas com variáveis CSS.

### `js/script.js`

Responsável por consumir a API e manipular o DOM:

- busca personagens na API com `fetch()`;
- usa `async/await`;
- trata erros de conexão e respostas inválidas;
- cria cards dinamicamente;
- aplica filtro por nome;
- aplica filtro por status;
- exibe loading durante o carregamento;
- mostra mensagem quando nenhum personagem é encontrado;
- controla o menu mobile.

### `assets/portal.svg`

Imagem vetorial criada para o banner principal, representando um portal interdimensional.

## Explicação das funções JavaScript

### `setLoading(isLoading)`

Mostra ou esconde o bloco de carregamento. Quando `isLoading` é `true`, o loading aparece; quando é `false`, ele fica oculto.

### `showError(message)`

Recebe uma mensagem e exibe essa mensagem na área de erro da página.

### `clearError()`

Limpa a mensagem de erro e esconde a área de erro.

### `clearCharacters()`

Remove todos os cards existentes dentro do container de personagens.

### `translateStatus(status)`

Traduz o status retornado pela API:

- `Alive` vira `Vivo`;
- `Dead` vira `Morto`;
- `unknown` vira `Desconhecido`.

### `translateGender(gender)`

Traduz o gênero retornado pela API:

- `Female` vira `Feminino`;
- `Male` vira `Masculino`;
- `Genderless` vira `Sem gênero`;
- `unknown` vira `Desconhecido`.

### `createDetailItem(label, value)`

Cria um item de lista com uma informação do personagem, como espécie, gênero ou última localização.

Essa função usa:

- `document.createElement("li")`;
- `document.createElement("strong")`;
- `appendChild()`;
- `document.createTextNode()`.

### `createCharacterCard(character)`

Cria um card completo para um personagem.

O card contém:

- imagem;
- nome;
- status;
- espécie;
- gênero;
- última localização.

Tudo é criado dinamicamente usando `createElement()` e montado com `appendChild()`.

### `renderCharacters(characters, totalResults)`

Recebe a lista de personagens retornada pela API, limpa o container e adiciona cada card na página.

Para cada personagem, chama:

```js
const card = createCharacterCard(character);
charactersContainer.appendChild(card);
```

### `buildApiUrl()`

Monta a URL da API com os filtros escolhidos pelo usuário.

Exemplos:

```text
https://rickandmortyapi.com/api/character
https://rickandmortyapi.com/api/character?name=rick
https://rickandmortyapi.com/api/character?status=alive
https://rickandmortyapi.com/api/character?name=morty&status=dead
```

### `fetchCharacters()`

Função principal de consumo da API.

Ela:

1. mostra o loading;
2. limpa erros anteriores;
3. chama a API com `fetch()`;
4. verifica se houve erro;
5. converte a resposta para JSON;
6. chama `renderCharacters()` para criar os cards;
7. esconde o loading ao final.

### `debounceFetchCharacters()`

Evita chamadas excessivas à API enquanto o usuário digita no campo de pesquisa. A busca só acontece depois de uma pequena pausa na digitação.

### `setupFilters()`

Adiciona eventos aos filtros:

- ao digitar no campo de pesquisa, aplica busca por nome;
- ao mudar o select de status, aplica filtro por status.

### `setupMobileMenu()`

Controla a abertura e fechamento do menu em telas menores.

## Como funciona o `fetch()`

O `fetch()` é uma função nativa do JavaScript usada para fazer requisições HTTP.

No projeto, ele é usado assim:

```js
const response = await fetch(buildApiUrl());
```

Explicação:

1. `buildApiUrl()` monta a URL da API com os filtros atuais.
2. `fetch()` envia a requisição para essa URL.
3. `await` espera a resposta chegar.
4. `response.ok` verifica se a resposta foi bem-sucedida.
5. `response.json()` transforma o corpo da resposta em objeto JavaScript.
6. Os dados são enviados para a função que renderiza os cards.

## Como os cards são criados dinamicamente

Os cards não são escritos manualmente no HTML. Cada card é criado pelo JavaScript quando os dados chegam da API.

Fluxo:

1. A API retorna uma lista de personagens.
2. A função `renderCharacters()` percorre essa lista.
3. Para cada personagem, chama `createCharacterCard(character)`.
4. `createCharacterCard()` cria elementos HTML com `document.createElement()`.
5. Os elementos são conectados com `appendChild()`.
6. O card pronto é inserido dentro de `#characters-container`.

## Como funciona a manipulação do DOM

DOM significa **Document Object Model**. Ele é a representação da página HTML dentro do JavaScript.

Neste projeto, o DOM é usado para:

- selecionar elementos com `document.getElementById()` e `document.querySelector()`;
- alterar textos com `textContent`;
- esconder e mostrar elementos com `hidden`;
- criar novos elementos com `createElement()`;
- inserir elementos na página com `appendChild()`;
- escutar eventos com `addEventListener()`.

## Como executar localmente

### Opção 1: abrir diretamente

1. Baixe ou clone o projeto.
2. Abra a pasta do projeto.
3. Dê dois cliques no arquivo `index.html`.
4. O site será aberto no navegador.

### Opção 2: usar um servidor local

Se tiver Python instalado, rode:

```bash
python3 -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

## Como testar

### Testar carregamento da API

1. Abra o site no navegador.
2. Vá até a seção **Personagens**.
3. Verifique se o loading aparece rapidamente.
4. Confirme se os cards são exibidos com imagem, nome, espécie, status, gênero e última localização.

### Testar pesquisa por nome

1. No campo "Pesquisar por nome", digite `Rick`.
2. Confira se aparecem personagens relacionados ao nome Rick.
3. Digite `Summer`, `Morty` ou outro nome para testar novas buscas.

### Testar filtro de status

1. Abra o campo "Filtrar por status".
2. Selecione `Vivo`, `Morto` ou `Desconhecido`.
3. Confira se a listagem muda de acordo com o filtro.

### Testar filtros combinados

1. Digite `Rick`.
2. Selecione o status `Vivo`.
3. Verifique se a API retorna personagens que atendem aos dois critérios.

### Verificar consumo da API

1. Abra o navegador.
2. Pressione `F12` para abrir as ferramentas de desenvolvedor.
3. Acesse a aba **Network** ou **Rede**.
4. Recarregue a página.
5. Procure a requisição para:

```text
https://rickandmortyapi.com/api/character
```

6. Teste os filtros e observe novas requisições com parâmetros como `name` e `status`.

## Como publicar no GitHub

Se o projeto ainda não estiver em um repositório Git, execute:

```bash
git init
git add .
git commit -m "Cria projeto Rick and Morty Universe"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

Se o repositório já existir localmente:

```bash
git add .
git commit -m "Atualiza projeto Rick and Morty Universe"
git push
```

## Como publicar no GitHub Pages

1. Acesse o repositório no GitHub.
2. Clique em **Settings**.
3. No menu lateral, clique em **Pages**.
4. Em **Build and deployment**, selecione:
   - Source: `Deploy from a branch`;
   - Branch: `main`;
   - Folder: `/root`.
5. Clique em **Save**.
6. Aguarde o GitHub gerar o link.

O link final normalmente terá este formato:

```text
https://SEU-USUARIO.github.io/SEU-REPOSITORIO/
```

## Link para publicação GitHub Pages

Após publicar, substitua pelo link real:

```text
https://SEU-USUARIO.github.io/SEU-REPOSITORIO/
```

## Prints sugeridos para o relatório

Capture imagens das seguintes partes:

1. Página inicial com banner principal.
2. Seção Sobre.
3. Seção Personagens carregada com cards.
4. Campo de pesquisa funcionando.
5. Filtro de status funcionando.
6. Aba Network/Rede mostrando a chamada para a API.
7. Layout responsivo no modo mobile.
8. Página do GitHub Pages publicada.

## Checklist final

- [x] HTML concluído
- [x] CSS concluído
- [x] JavaScript concluído
- [x] API funcionando
- [x] Cards dinâmicos funcionando
- [x] Responsividade funcionando
- [ ] GitHub criado
- [ ] GitHub Pages publicado
- [ ] Prints capturados
- [ ] PDF teórico criado
- [ ] Vídeo Pitch gravado

## O que ainda falta para atingir 100% dos requisitos do professor

### Parte teórica

Para completar a entrega teórica, crie um PDF explicando:

1. objetivo do projeto;
2. tecnologias utilizadas;
3. motivo de usar HTML, CSS e JavaScript puro;
4. estrutura das pastas;
5. explicação da API Rick and Morty;
6. explicação do `fetch()`;
7. explicação da criação dinâmica dos cards;
8. explicação dos filtros;
9. prints do site funcionando;
10. conclusão com aprendizados.

### Vídeo Pitch

Para o vídeo, grave uma apresentação curta mostrando:

1. a página inicial;
2. a seção sobre;
3. os cards carregados pela API;
4. a pesquisa por nome;
5. o filtro de status;
6. o DevTools mostrando a requisição da API;
7. o layout em modo mobile;
8. o link do GitHub Pages publicado.

Sugestão de roteiro:

```text
Olá, meu nome é [seu nome] e este é o projeto Rick and Morty Universe.
Ele foi desenvolvido com HTML, CSS e JavaScript puro, sem frameworks.
O site consome dados em tempo real da Rick and Morty API.
Os cards são criados dinamicamente pelo JavaScript usando fetch, createElement e appendChild.
Também implementei pesquisa por nome, filtro por status, loading, tratamento de erros e layout responsivo.
```

## Revisão dos requisitos

- Header com logo textual e menu: atendido.
- Banner principal com imagem, texto e botão: atendido.
- Seção Sobre com história e informações: atendido.
- Seção Personagens com cards da API: atendido.
- Footer com créditos e link da API: atendido.
- Cards com imagem, nome, espécie, status, gênero e última localização: atendido.
- Cards criados dinamicamente no JavaScript: atendido.
- HTML com apenas container vazio para os cards: atendido.
- Uso de `fetch()`: atendido.
- Uso de `createElement()`: atendido.
- Uso de `appendChild()`: atendido.
- Campo de pesquisa por nome: atendido.
- Filtro de status: atendido.
- Loading durante carregamento: atendido.
- Mensagem de erro caso a API falhe: atendido.
- Layout responsivo para celular: atendido.
- Hover effects: atendido.
- Scroll suave: atendido.
- Flexbox, Grid, responsividade e animações: atendido.
- README profissional: atendido.

## Status final

O projeto atende aos requisitos técnicos solicitados. Para finalizar a entrega acadêmica, ainda é necessário publicar no GitHub Pages, capturar os prints, criar o PDF teórico e gravar o vídeo Pitch.