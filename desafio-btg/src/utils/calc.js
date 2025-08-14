function calcValorTotal(itens) {
  return (itens || []).reduce((acc, it) => {
    const qtd = Number(it.quantidade) || 0;
    const preco = Number(it.preco) || 0;
    return acc + (qtd * preco);
  }, 0);
}

module.exports = { calcValorTotal };
