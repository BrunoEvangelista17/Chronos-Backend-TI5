
# Chronos - Backend

## Visão Geral
O backend do **Chronos** é uma solução robusta para gerenciamento de projetos ágeis, suportando metodologias como Scrum e Kanban. Desenvolvido com **Nest.js** e **TypeScript**, utiliza **MongoDB** como banco de dados NoSQL e integra **Apache Kafka** e **Socket.IO** para notificações em tempo real. O sistema oferece suporte a dashboards de desempenho, quadros Kanban, gestão de reuniões, métricas de produtividade e automação de processos, promovendo eficiência e colaboração em equipes ágeis.

Este README detalha a arquitetura, tecnologias, funcionalidades, endpoints da API e instruções para configuração e execução do backend.

---

## Tecnologias Utilizadas
- **Framework**: Nest.js (TypeScript)
- **Banco de Dados**: MongoDB (NoSQL) com Mongoose (ODM)
- **API**: RESTful com Fastify (via Nest.js)
- **Notificações em Tempo Real**: Apache Kafka (eventos assíncronos) + Socket.IO (WebSockets)
- **Autenticação/Autorização**: Firebase Authentication + JWT
- **Testes**: Jest (cobertura de 80% com testes unitários e de integração)
- **Deploy**: Railway (plataforma de hospedagem na nuvem)
- **Observabilidade**: ELK Stack (logs do sistema)

---

## Arquitetura
O backend segue uma arquitetura modular baseada em microserviços, com comunicação assíncrona para notificações e eventos. A estrutura é organizada em módulos (Auth, User, Task, Project, Meeting, Notification), utilizando injeção de dependências para maior escalabilidade e manutenção.

### Diagrama de Componentes
![Diagrama de Componentes](https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-1-ti5-6904100-chronos/blob/main/docs/imagens/Compomentes.jpg?raw=true)

### Modelo de Dados
O modelo de dados é baseado em coleções MongoDB, mapeadas via Mongoose. As principais entidades incluem:
- **Project**: Armazena informações do projeto (nome, descrição, membros, papéis).
- **Task**: Representa tarefas com atributos como descrição, prazo, responsável, status, complexidade e dependências.
- **Meeting**: Gerencia reuniões (Daily Scrum, Sprint Review, etc.) com participantes, data e local.
- **User**: Contém dados de usuários, incluindo papéis (Scrum Master, Product Owner, Developer) e métricas de desempenho.
- **Notification**: Registra notificações enviadas aos usuários (prazos, atualizações, tarefas dependentes).

![Modelo de Dados]([imagens/DER.png](https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-1-ti5-6904100-chronos/blob/main/docs/imagens/der.png?raw=true))

---

## Funcionalidades do Backend
O backend suporta as seguintes funcionalidades principais, conforme os requisitos funcionais do projeto:

1. **Gerenciamento de Projetos** (RF005, RF011):
   - Criação, edição, listagem e exclusão de projetos.
   - Gestão de membros e papéis (Scrum Master, Product Owner, Developer).

2. **Gestão de Tarefas** (RF004, RF007, RF008, RF013, RF014, RF016):
   - CRUD de tarefas com suporte a dependências.
   - Quadro Kanban interativo com colunas personalizáveis e movimentação de tarefas.
   - Aprovação e avaliação automática de entregas com atribuição de notas.
   - Notificações automáticas para tarefas concluídas e dependentes.

3. **Métricas e Relatórios** (RF001, RF006, RF009, RF015):
   - Geração de relatórios de desempenho (tarefas por membro, complexidade, tempo médio).
   - Gráficos de Burndown para acompanhamento de progresso.
   - Ranking de profissionais com base em métricas de desempenho.

4. **Gestão de Reuniões** (RF003):
   - CRUD de reuniões (Daily Scrum, Sprint Review, Retrospective, etc.).
   - Gerenciamento de participantes e dados de tempo/local.

5. **Notificações em Tempo Real** (RF002, RF010, RF012, RF016):
   - Envio de notificações para atualizações de tarefas, prazos e mensagens personalizadas.
   - Integração com Kafka para eventos assíncronos e Socket.IO para WebSockets.

---

## Endpoints da API
A API segue o padrão RESTful, utilizando Fastify como servidor HTTP. Abaixo estão os principais endpoints:

### Autenticação
- `POST /auth/login`: Autentica usuário via Firebase e retorna JWT.
- `POST /auth/refresh`: Renova o token JWT.

### Projetos
- `POST /projects`: Cria um novo projeto.
- `GET /projects`: Lista todos os projetos.
- `GET /projects/:id`: Retorna detalhes de um projeto específico.
- `PUT /projects/:id`: Atualiza um projeto.
- `DELETE /projects/:id`: Exclui um projeto.

### Tarefas
- `POST /tasks`: Cria uma nova tarefa.
- `GET /tasks`: Lista todas as tarefas de um projeto.
- `GET /tasks/:id`: Retorna detalhes de uma tarefa.
- `PUT /tasks/:id`: Atualiza uma tarefa (ex.: status, responsável).
- `DELETE /tasks/:id`: Exclui uma tarefa.
- `POST /tasks/:id/complete`: Marca uma tarefa como concluída e envia notificações.

### Reuniões
- `POST /meetings`: Cria uma nova reunião.
- `GET /meetings`: Lista todas as reuniões de um projeto.
- `PUT /meetings/:id`: Atualiza uma reunião.
- `DELETE /meetings/:id`: Exclui uma reunião.

### Notificações
- `POST /notifications`: Envia uma notificação personalizada (Scrum Master).
- `GET /notifications`: Lista notificações de um usuário.

### Relatórios
- `GET /reports/burndown/:projectId`: Gera gráfico de Burndown.
- `GET /reports/performance/:projectId`: Retorna métricas de desempenho da equipe.

---

## Configuração e Execução

### Pré-requisitos
- **Node.js** (v16 ou superior)
- **MongoDB** (local ou Atlas)
- **Apache Kafka** (para notificações assíncronas)
- **Firebase** (para autenticação)
- **Docker** (opcional, para ambiente conteinerizado)

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/BrunoEvangelista17/chronos-backend.git
   cd chronos-backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente em um arquivo `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/chronos
   KAFKA_BROKER=localhost:9092
   FIREBASE_CONFIG={...} # Configuração do Firebase
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

4. Inicie o servidor:
   ```bash
   npm run start:dev
   ```

### Testes
Execute os testes unitários e de integração com Jest:
```bash
npm run test
```

---

## Deploy
O backend está hospedado na plataforma **Railway**, com escalabilidade horizontal para suportar múltiplos usuários simultâneos. Para deploy local, use:
```bash
npm run build
npm run start:prod
```

---

## Modelo de Dados
O modelo de dados utiliza coleções MongoDB, mapeadas via Mongoose. O diagrama de entidades (DER) está disponível na pasta src/scheema

### Principais Coleções
- **Project**: `{ id, name, description, members: [{ userId, role }], createdAt, updatedAt }`
- **Task**: `{ id, projectId, description, status, priority, complexity, assigneeId, dueDate, dependencies: [taskId], createdAt, updatedAt }`
- **Meeting**: `{ id, projectId, type, date, location, participants: [userId], createdAt, updatedAt }`
- **User**: `{ id, firebaseId, name, email, role, performanceMetrics: { tasksCompleted, avgTime } }`
- **Notification**: `{ id, userId, message, type, createdAt }`

---

## Contribuição
1. Faça um fork do repositório.
2. Crie uma branch para sua feature: `git checkout -b feature/nova-funcionalidade`.
3. Commit suas alterações: `git commit -m 'Adiciona nova funcionalidade'`.
4. Envie para o repositório remoto: `git push origin feature/nova-funcionalidade`.
5. Abra um Pull Request.

---

## Contato
Para dúvidas ou sugestões, entre em contato com a equipe:
- **Bruno Evangelista**: [brunoevangelistag15@gmail.com](mailto:brunoevangelistag15@gmail.com)
- **GitHub**: [BrunoEvangelista17](https://github.com/BrunoEvangelista17)

---

## Referências
- ELMASRI, Ramez; NAVATHE, Sham. **Sistemas de banco de dados**. 7. ed. São Paulo: Pearson, c2019. E-book. ISBN 9788543025001.
- SUTHERLAND, Jeffrey Victor. **Scrum: a arte de fazer o dobro do trabalho na metade do tempo**. 2. ed. rev. São Paulo, SP: Leya, 2016. ISBN 9788544104514.

```

### Notas:
- **Foco no Backend**: O README foi estruturado para detalhar exclusivamente o backend do Chronos, com base nas informações fornecidas (tecnologias, requisitos, modelagem, etc.).
- **Endpoints**: Os endpoints listados são exemplos baseados nos requisitos funcionais (RF001 a RF016). Ajuste-os conforme a implementação real do projeto.
- **Modelo de Dados**: As coleções foram descritas com base no contexto fornecido. Substitua o link do diagrama (`imagens/DER.png`) pelo caminho real no repositório.
- **Instruções de Configuração**: Incluí instruções genéricas para configuração e execução. Ajuste as variáveis de ambiente e pré-requisitos conforme a implementação específica.
- **Artefatos Visuais**: Os links para diagramas (Componentes e DER) foram mantidos como placeholders (`imagens/Compomentes.jpg` e `imagens/DER.png`). Atualize com os caminhos corretos no repositório.
- **Contribuições de Bruno**: Destaquei as contribuições mencionadas no histórico de revisões (notificações, Kanban, relatórios, reuniões) para reforçar seu papel no backend.

Se precisar de ajustes, como adicionar mais detalhes sobre um módulo específico, incluir mais endpoints, ou integrar com outras seções do projeto, é só avisar!
