import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

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
      cy.get('@circle')
        .should('have.length', arrIndex + 1)
        .each(($el, index) => {
          cy.wrap($el)
          if (index === arrIndex) {
            expect($el).to.contain(item)
            expect($el).to.have.css('border-color', 'rgb(210, 82, 225)')
          }
        });
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get('@circle')
        .should('have.length', arrIndex + 1)
        .each(($el, index) => {
          cy.wrap($el)
          if (index === arrIndex) {
            expect($el).to.contain(item)
            expect($el).to.have.css('border-color', 'rgb(0, 50, 255)')
          }
        });
    });
  });

  it('Элемент удаляется правильно', () => {
    array.forEach(i => {
      cy.get('input').type(i);
      cy.contains('Добавить').click();
    });
    cy.contains('Удалить').click();
    cy.get('[class^=circle_circle]').as('circle');
    cy.get('@circle')
      .should('have.length', array.length)
      .each(($el, index) => {
        cy.wrap($el)
        if (index === array.length - 1) {
          expect($el).to.contain(array[array.length - 1])
          expect($el).to.have.css('border-color', 'rgb(210, 82, 225)')
        }
      });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circle')
      .should('have.length', array.length - 1)
  });

  it('Очистка стека работает правильно', () => {
    array.forEach(i => {
      cy.get('input').type(i);
      cy.contains('Добавить').click();
    })
    cy.contains('Очистить').click();
    cy.get('[class^=circle_circle]')
      .should('not.exist');
  });
});

