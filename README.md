# desafio-btg
projeto simples com intuito de processar pedidos e gerar relatórios

# endpoints
GET /api/pedido/:codigoPedido → { codigoPedido, valorTotal }<br>
GET /api/cliente/:codigoCliente/quantidade → { codigoCliente, quantidadePedidos }<br>
GET /api/cliente/:codigoCliente/pedidos → [] lista de pedidos do cliente

# como rodar localmente
Clonar repositório<br>
Copiar .env.example para .env e ajustar variáveis: MONGO_URL, RABBITMQ_URL<br>
docker-compose up --build<br>
npm install<br>
npm run dev<br>
node scripts/producer.js (para enviar mensagem de teste para a fila)
