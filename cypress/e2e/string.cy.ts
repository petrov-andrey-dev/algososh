describe('Страница строка работает корректно', () => {
    beforeEach(() => {
      cy.visit('/recursion');
    });

    it('Кнопка развернуть недоступна если инпуте пусто', () => {
        cy.get('input').should('be.empty');
        cy.contains('Развернуть').should('be.disabled');
    })


});