describe('Страница Последовательность Фибоначчи работает корректно', () => {
  beforeEach(() => {
    cy.visit('/fibonacci');
  });

  it('Кнопка Рассчитать недоступна если инпуте пусто', () => {
    cy.get('input').should('be.empty');
    cy.contains('Рассчитать').should('be.disabled');
  });

  it('Числа генерируются корректно', () => {
    const number = '4'
    const fibArray = ['1', '1', '2', '3', '5']

    cy.get('input').type(number);
    cy.contains('Рассчитать').click();

    for (let i = 0; i < Number(number); i++) {
      cy.get('[class^=circle_circle]').as('circle');
      cy.get('@circle').eq(i).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      cy.get('@circle').eq(i).contains(fibArray[i]);
    };
  });
});