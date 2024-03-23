describe('Страница Стек работает корректно', () => {
    beforeEach(() => {
      cy.visit('/stack');
    });

    it('Кнопка Рассчитать недоступна если инпуте пусто', () => {
        cy.get('input').should('be.empty');
        cy.contains('Добавить').should('be.disabled');
    })


});