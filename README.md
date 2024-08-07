# Sistema de Notificação e Análise de Dados das Olimpíadas Paris 2024

Este projeto é uma aplicação que extrai dados dos países medalhistas nas Olimpíadas de Paris 2024, visualiza essas informações em um gráfico e permite que os usuários se inscrevam para receber notificações por e-mail sobre os países escolhidos, caso estejam entre os top 5 medalhistas.

## Estrutura do Projeto

- **Extração de Dados**: Usa BeautifulSoup para coletar dados de medalhas dos países.
- **Servidor Node.js**: Recebe os dados extraídos, exibe gráficos e gerencia as inscrições dos usuários para notificações.
- **Docker**: Utilizado para criar e gerenciar dois containers (um para extração e limpeza de dados, e outro para o servidor Node.js).
- **Docker Compose**: Gerencia a comunicação entre os containers.

## Como Executar o Projeto

1. **Clone o repositório**
   ```bash
   git clone https://github.com/usuario/nome-do-repositorio.git
   cd nome-do-repositorio
   
2. **Configurar .env**
   - Edite o arquivo .env e forneça suas próprias credenciais e informações necessárias.
   
3. **Construir e iniciar os containers**
   ```bash
   docker-compose up --build

4. **Acessar a aplicação**
  - Acesse a visualização dos dados gráfico em http://localhost:3000/grafico.html
  - Inscreva-se para notificações em http://localhost:3000/notify.html

5. **Requisitos**
   - Docker
   - Docker compose
