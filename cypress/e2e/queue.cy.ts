describe('Страница Очередь работает корректно', () => {
    beforeEach(() => {
      cy.visit('/queue');
    });

    it('Кнопка Рассчитать недоступна если инпуте пусто', () => {
        cy.get('input').should('be.empty');
        cy.contains('Добавить').should('be.disabled');
    })


});