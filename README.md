# GeoSapiens - Asset Management System

Aplicação web para gerenciamento de ativos empresariais (computadores, monitores, periféricos e equipamentos de TI).

O sistema permite cadastrar, editar, listar e gerenciar ativos através de uma interface moderna integrada a uma API REST containerizada.

---

## Tecnologias Utilizadas

### Front-end
- React
- Vite
- TypeScript
- Chakra UI (v3)
- React Router
- Nginx

### Back-end
- Java 21
- Spring Boot
- Spring Data JPA
- Hibernate
- PostgreSQL

### Infraestrutura
- Docker
- Docker Compose
- PostgreSQL 16

---

## Arquitetura do Projeto

O projeto foi estruturado com separação clara entre Front-end, Back-end e Banco de Dados.
├── frontend-gs # SPA React
├── back-end-gs # API Spring Boot
├── db/init # Scripts SQL de inicialização
└── docker-compose.yml


### Fluxo da aplicação
Browser
↓
React + Nginx (Docker)
↓
Spring Boot API (Docker)
↓
PostgreSQL (Docker)


Todos os serviços são executados via Docker Compose, garantindo execução **plug and play**.

---

## Como executar o projeto

### Pré-requisitos

É necessário possuir apenas:

- Docker
- Docker Compose

Nenhuma outra dependência precisa ser instalada localmente.

---

### Executando a aplicação

Na raiz do projeto execute:

```bash
docker compose up --build

Na primeira execução o Docker irá:
    Construir o Front-end
    Construir o Back-end
    Criar o banco PostgreSQL
    Executar scripts SQL iniciais
    Inicializar todos os serviços automaticamente

| Serviço   | URL                                            |
| --------- | ---------------------------------------------- |
| Front-end | [http://localhost:3000](http://localhost:3000) |
| API REST  | [http://localhost:8080](http://localhost:8080) |

Banco de Dados

O banco PostgreSQL é inicializado automaticamente através de scripts SQL localizados em:

db/init/

Esses scripts são executados automaticamente durante a primeira inicialização do container.

Tabela principal criada: assets

Campos principais:
    id
    name
    category
    serial_number
    acquisition_date
    status

🔌 API REST

Endpoints disponíveis:

| Método | Endpoint     | Descrição             |
| ------ | ------------ | --------------------- |
| GET    | /assets      | Lista todos os ativos |
| POST   | /assets      | Cria um ativo         |
| PUT    | /assets/{id} | Atualiza um ativo     |
| DELETE | /assets/{id} | Remove um ativo       |

🎨 Front-end

A interface foi desenvolvida como uma Single Page Application (SPA) focada em usabilidade e organização administrativa.

Principais funcionalidades:
    Dashboard com métricas
    Listagem de ativos
    Filtros por categoria e status
    Cadastro e edição de ativos
    Componentização reutilizável

🐳 Decisões Técnicas
Docker First Approach
Toda a aplicação foi projetada para execução via Docker, eliminando dependências locais e garantindo ambiente reproduzível.

Separação de Serviços
Front-end, Back-end e Banco de Dados executam em containers independentes, permitindo escalabilidade e isolamento.

PostgreSQL Containerizado
O banco é iniciado automaticamente e configurado via scripts SQL.

Nginx no Front-end
O React é servido via Nginx em modo produção, simulando ambiente real de deploy.

Comunicação entre Containers
A API conecta-se ao banco utilizando a rede interna do Docker:

jdbc:postgresql://db:5432/assets

Evitando dependência de localhost.

🔄 Resetar Ambiente

Caso seja necessário recriar completamente o ambiente:

docker compose down -v
docker compose up --build