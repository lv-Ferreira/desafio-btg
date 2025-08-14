# desafio-btg
projeto simples com intuito de processar pedidos e gerar relatórios

# endpoints
GET /api/pedido/:codigoPedido → { codigoPedido, valorTotal }
GET /api/cliente/:codigoCliente/quantidade → { codigoCliente, quantidadePedidos }
GET /api/cliente/:codigoCliente/pedidos → [] lista de pedidos do cliente

# como rodar localmente
Clonar repositório
Copiar .env.example para .env e ajustar variáveis: MONGO_URL, RABBITMQ_URL
docker-compose up --build
npm install
npm run dev
node scripts/producer.js (para enviar mensagem de teste para a fila)
