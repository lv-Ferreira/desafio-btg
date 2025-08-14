# Desafio BTG — Processar pedidos e gerar relatório

Stack: **Node.js + Express + MongoDB + RabbitMQ + Docker Compose**

## Como rodar (Docker)

1. Copie `.env.example` para `.env` e ajuste se necessário.
2. Suba os serviços:
   ```bash
   docker-compose up --build
   ```
3. A API estará em `http://localhost:3000` e o management do RabbitMQ em `http://localhost:15672` (user/pass: guest/guest).

### Enviando uma mensagem de teste para a fila
Use o script `producer.js` (ele usa a variável `RABBITMQ_URL`):
```bash
node scripts/producer.js
```
ou acesse o Management do RabbitMQ e publique manualmente a mensagem na fila `pedidos`.

### Endpoints
- `GET /api/pedido/:codigoPedido` → `{ codigoPedido, valorTotal }`
- `GET /api/cliente/:codigoCliente/quantidade` → `{ codigoCliente, quantidadePedidos }`
- `GET /api/cliente/:codigoCliente/pedidos` → lista de pedidos do cliente

### Exemplo de mensagem na fila
```json
{
  "codigoPedido": 1001,
  "codigoCliente": 1,
  "itens": [
    { "produto": "lápis", "quantidade": 100, "preco": 1.10 },
    { "produto": "caderno", "quantidade": 10, "preco": 1.00 }
  ]
}
```

## Como rodar localmente (sem Docker)
- Necessário: MongoDB e RabbitMQ rodando.
- Crie `.env` com `MONGO_URL`, `RABBITMQ_URL` e `PORT`.
- Instale deps e rode:
  ```bash
  npm install
  npm run dev
  ```

## Testes
- Teste unitário do cálculo de `valorTotal`:
  ```bash
  npm test
  ```

## Estrutura
```
desafio-btg/
├─ docker-compose.yml
├─ Dockerfile
├─ .env.example
├─ README.md
├─ package.json
├─ src/
│  ├─ server.js
│  ├─ app.js
│  ├─ consumer.js
│  ├─ routes/
│  │  └─ pedidos.js
│  ├─ controllers/
│  │  └─ pedido.controller.js
│  ├─ models/
│  │  └─ pedido.model.js
│  └─ utils/
│     ├─ rabbitmq.js
│     └─ calc.js
├─ scripts/
│  └─ producer.js
└─ tests/
   └─ calc.test.js
```
