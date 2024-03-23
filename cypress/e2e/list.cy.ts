describe('Страница Связный список работает корректно', () => {
    beforeEach(() => {
      cy.visit('/list');
    });

    it('Все кнопки добавления и кнопка удалевения по индексу недоступны если инпуте пусто', () => {
        cy.get('input').should('be.empty');
        cy.contains('Добавить в head').should('be.disabled');
        cy.contains('Добавить в tail').should('be.disabled');
        cy.contains('Добавить по индексу').should('be.disabled');
        cy.contains('Удалить по индексу').should('be.disabled');
    })


});