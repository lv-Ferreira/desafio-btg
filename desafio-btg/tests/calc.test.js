const { calcValorTotal } = require('../src/utils/calc');

describe('calcValorTotal', () => {
  test('soma corretamente itens', () => {
    const itens = [
      { produto: 'A', quantidade: 2, preco: 10 },
      { produto: 'B', quantidade: 3, preco: 5 }
    ];
    expect(calcValorTotal(itens)).toBe(2*10 + 3*5);
  });

  test('lida com valores inválidos', () => {
    const itens = [
      { produto: 'A', quantidade: '2', preco: '10.5' },
      { produto: 'B', quantidade: null, preco: 5 }
    ];
    expect(calcValorTotal(itens)).toBe(2*10.5 + 0);
  });

  test('lista vazia retorna 0', () => {
    expect(calcValorTotal([])).toBe(0);
    expect(calcValorTotal(undefined)).toBe(0);
  });
});
