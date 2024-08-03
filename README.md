## Backend do Site da Profa. Priscila
Este backend é responsável por gerenciar o conteúdo das aulas, scripts em R e fornecer um espaço de contato para alunos. Foi desenvolvido com Node.js e Express, e utiliza um banco de dados MySQL para armazenar informações. Está sendo deployado no Azure e em testes.

### Estrutura do Projeto
- **config/db.js**: Configuração e conexão com o banco de dados MySQL.
- **models/**: Contém os arquivos de modelo para interagir com o banco de dados.
  - **aulas.js**: Modelo para gerenciar informações das aulas.
  - **scripts.js**: Modelo para gerenciar informações dos scripts em R.
  - **user.js**: Modelo para gerenciar informações dos usuários.
- **routes/**: Contém as rotas da API.
  - **aulasRoutes.js**: Rotas para gerenciar as aulas.
  - **scriptsRoutes.js**: Rotas para gerenciar os scripts em R.
  - **userRoutes.js**: Rotas para gerenciar os usuários.
- **app.js**: Configuração e inicialização do servidor Express.

### Instalação
Siga os passos abaixo para configurar e executar o backend em sua máquina local:  

- Clone o repositório:
> git clone https://github.com/seuusuario/seurepositorio.git
> cd seurepositorio
- Istale as dependências:
> npm install
- Configure as variáveis de ambiente:
- Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:
> DB_HOST=localhost
> DB_USER=seuusuario
> DB_PASSWORD=suasenha
> DB_NAME=seubanco
- Inicie o servidor:
> npm start  
O servidor estará disponível em http://localhost:3000.  

### Rotas da API
- Aulas
> GET /aulas - Obtém todas as aulas.  
> GET /aulas/:id - Obtém uma aula por ID.  
> POST /aulas - Cria uma nova aula.  
> DELETE /aulas/:id - Remove uma aula por ID.  
- Scripts
> GET /scripts - Obtém todos os scripts.  
> GET /scripts/:id - Obtém um script por ID.  
> POST /scripts - Cria um novo script.  
> DELETE /scripts/:id - Remove um script por ID.  
- Usuários
> GET /users/:id - Obtém um usuário por ID.  
