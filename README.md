# Gerenciador de Reservas de Restaurante

Este é um sistema para gerenciar reservas de restaurante, permitindo cadastrar clientes, agendar reservas, visualizar reservas agendadas e (opcionalmente) confirmar ou cancelar reservas.

## Tecnologias Utilizadas

* **Frontend:** React
* **Backend:** Node.js com Express
* **Banco de Dados:** PostgreSQL
* **Outras Bibliotecas:**
    * `pg` (para conexão com PostgreSQL)
    * `cors` (para habilitar CORS)
    * `express` (framework web para Node.js)

## Configuração

1.  **Banco de Dados:**

    * Certifique-se de ter o PostgreSQL instalado e rodando.
    * Crie um banco de dados para o sistema.
    * Configure as credenciais do banco de dados no arquivo `backend-reservas/db.config.js`.  Este arquivo deve exportar um objeto com as seguintes propriedades:

        ```javascript
        module.exports = {
          user: 'seu_usuario',       // Seu usuário do PostgreSQL
          host: 'seu_host',         // O host do banco de dados (geralmente 'localhost')
          database: 'nome_do_banco', // O nome do banco de dados que você criou
          password: 'sua_senha',     // Sua senha do PostgreSQL
          port: 5432,               // A porta do PostgreSQL (geralmente 5432)
        };
        ```

2.  **Backend (Servidor Node.js):**

    * Navegue até o diretório `backend-reservas` no seu terminal.
    * Execute `npm install` para instalar as dependências.
    * Execute `node server.js` para iniciar o servidor.  O servidor será executado na porta 3001 por padrão.

3.  **Frontend (Aplicação React):**

    * Navegue até o diretório raiz do projeto (onde o arquivo `package.json` do React está).
    * Execute `npm install` (ou `yarn install` se você estiver usando o Yarn) para instalar as dependências.
    * Execute `npm start` (ou `yarn start`) para iniciar o servidor de desenvolvimento.  A aplicação será aberta em seu navegador (geralmente em `http://localhost:3000`).

## Estrutura do Projetosistema-reservas-restaurante-main/

├── backend-reservas/       # Código do servidor Node.js
│   ├── server.js         # Arquivo principal do servidor
│   ├── db.config.js      # Configuração do banco de dados
│   └── ...
├── src/                  # Código da aplicação React
│   ├── App.js            # Componente principal da aplicação
│   ├── components/       # Componentes React
│   │   ├── MenuPrincipal.jsx       # Menu principal da aplicação
│   │   ├── FormCadastroCliente.jsx # Formulário para cadastrar clientes
│   │   ├── FormAgendarReserva.jsx  # Formulário para agendar reservas
│   │   ├── VisualizarReservas.jsx  # Tela para visualizar reservas
│   │   └── ...
│   └── ...
├── package.json          # Arquivos de configuração do Node.js/React
├── README.md             # Este arquivo
└── ...


## Funcionalidades

* **Cadastrar Cliente:** Permite adicionar novos clientes ao sistema.
* **Agendar Reserva:** Permite criar novas reservas, associando-as a um cliente existente.
* **Visualizar Reservas:** Exibe uma lista de todas as reservas agendadas.
* **(Opcional) Confirmação/Cancelamento de Reserva:** Permite alterar o status de uma reserva para "Confirmada" ou "Cancelada".  (Esta funcionalidade pode ser habilitada/desabilitada no código do Menu).
