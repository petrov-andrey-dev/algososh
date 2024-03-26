import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('Страница Последовательность Фибоначчи работает корректно', () => {
  beforeEach(() => {
    cy.visit('/fibonacci');
  });

  it('Кнопка Рассчитать недоступна если инпуте пусто', () => {
    cy.get('input').should('be.empty');
    cy.contains('Рассчитать').should('be.disabled');
  })
  it('Числа генерируются корректно', () => {
    cy.get('input').type('3');
    cy.contains('Рассчитать').click();

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[class^=circle_circle]').as('circle');
    cy.get('@circle')
      .should('have.length', 1)
      .each(($el, index) => {
        cy.wrap($el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
        if (index === 0) expect($el).to.contain('1');
      })

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[class^=circle_circle]').as('circle');
    cy.get('@circle')
      .should('have.length', 2)
      .each(($el, index) => {
        cy.wrap($el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
        if (index === 1) expect($el).to.contain('1');
      });

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[class^=circle_circle]').as('circle');
    cy.get('@circle')
      .should('have.length', 3)
      .each(($el, index) => {
        cy.wrap($el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
        if (index === 2) expect($el).to.contain('2');
      });

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[class^=circle_circle]').as('circle');
    cy.get('@circle')
      .should('have.length', 4)
      .each(($el, index) => {
        cy.wrap($el).should('have.css', 'border-color', 'rgb(0, 50, 255)');
        if (index === 3) expect($el).to.contain('3');
      })
  });
});