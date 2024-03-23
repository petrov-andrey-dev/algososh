describe('Страница Последовательность Фибоначчи работает корректно', () => {
    beforeEach(() => {
      cy.visit('/fibonacci');
    });

    it('Кнопка Рассчитать недоступна если инпуте пусто', () => {
        cy.get('input').should('be.empty');
        cy.contains('Рассчитать').should('be.disabled');
    })


});