describe('Страница Стек работает корректно', () => {
  const array = ['1', '2', '3'];

  beforeEach(() => {
    cy.visit('/stack');
  });

  it('Кнопка Добавить недоступна если инпуте пусто', () => {
    cy.get('input').should('be.empty');
    cy.contains('Добавить').should('be.disabled');
  });

  it('Элмент добавляется в стек правильно', () => {
    array.forEach((item, arrIndex) => {
      cy.get('input').type(item);
      cy.contains('Добавить').click();
      cy.get('[class^=circle_circle]').as('circle');
      cy.get('@circle').should('have.length', arrIndex + 1)
      cy.get('@circle').eq(arrIndex).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      cy.get('@circle').eq(arrIndex).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      cy.get('@circle').eq(arrIndex).contains(item);
      cy.get('@circle').eq(arrIndex).prev().contains('top')
      cy.contains('Добавить').should('be.disabled');
    });
  });

  it('Элемент удаляется правильно', () => {
    array.forEach(i => {
      cy.get('input').type(i);
      cy.contains('Добавить').click();
      cy.get('[class^=circle_circle]').as('circle');
      cy.contains('Добавить').should('be.disabled');
    });
    for (let i = 0; i < array.length; i++) {
      cy.contains('Удалить').click();
      cy.get('@circle').should('have.length', array.length - i);
      cy.get('@circle').eq(array.length - i -1).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      cy.get('@circle').should('have.length', array.length - i - 1);
    };
  });

  it('Очистка стека работает правильно', () => {
    array.forEach(i => {
      cy.get('input').type(i);
      cy.contains('Добавить').click();
      cy.get('[class^=circle_circle]').as('circle');
      cy.contains('Добавить').should('be.disabled');
    })
    cy.contains('Очистить').click();
    cy.get('@circle').should('not.exist');
  });
});

