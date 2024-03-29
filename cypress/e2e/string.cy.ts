import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from './../../src/constants/delays';
describe('Страница строка работает корректно', () => {
    beforeEach(() => {
      cy.visit('/recursion');
    });

    it('Кнопка развернуть недоступна если инпуте пусто', () => {
        cy.get('input').should('be.empty');
        cy.contains('Развернуть').should('be.disabled');
    });

    it('Строка четной длины разворачивается корректно', () => {
        cy.get('input').type('word');
        cy.contains('Развернуть').click();
        cy.get('[class^=circle_circle]').as('circle');

        cy.get('@circle')
        .should('have.length', 4)
        .each(($el, index) => {
            cy.wrap($el).should('have.css', 'border-color', 'rgb(0, 50, 255)');

            if (index === 0) expect($el).to.contain('w');
            if (index === 1) expect($el).to.contain('o');
            if (index === 2) expect($el).to.contain('r');
            if (index === 3) expect($el).to.contain('d');
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('@circle')
        .each(($el, index) => {
            if (index === 0 || index === 3) {
                cy.wrap($el).should('have.css', 'border-color', 'rgb(210, 82, 225)')
            } else {
                cy.wrap($el).should('have.css', 'border-color', 'rgb(0, 50, 255)')
            }

            if (index === 0) expect($el).to.contain('w');
            if (index === 1) expect($el).to.contain('o');
            if (index === 2) expect($el).to.contain('r');
            if (index === 3) expect($el).to.contain('d');
        });

        cy.wait(DELAY_IN_MS);

        cy.get('@circle')
        .each(($el, index) => {
            if (index === 0 || index === 3) {
                cy.wrap($el).should('have.css', 'border-color', 'rgb(127, 224, 81)')
            } else {
                cy.wrap($el).should('have.css', 'border-color', 'rgb(210, 82, 225)')
            }

            if (index === 0) expect($el).to.contain('d');
            if (index === 1) expect($el).to.contain('o');
            if (index === 2) expect($el).to.contain('r');
            if (index === 3) expect($el).to.contain('w');
        });

        cy.wait(DELAY_IN_MS);

        cy.get('@circle')
        .each(($el, index) => {
            cy.wrap($el).should('have.css', 'border-color', 'rgb(127, 224, 81)');

            if (index === 0) expect($el).to.contain('d');
            if (index === 1) expect($el).to.contain('r');
            if (index === 2) expect($el).to.contain('o');
            if (index === 3) expect($el).to.contain('w');
        });
    });

    it('Строка нечетной длины разворачивается корректно', () => {
        cy.get('input').type('cow');
        cy.contains('Развернуть').click();
        cy.get('[class^=circle_circle]').as('circle');

        cy.get('@circle')
        .should('have.length', 3)
        .each(($el, index) => {
            cy.wrap($el).should('have.css', 'border-color', 'rgb(0, 50, 255)');

            if (index === 0) expect($el).to.contain('c');
            if (index === 1) expect($el).to.contain('o');
            if (index === 2) expect($el).to.contain('w');
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('@circle')
        .each(($el, index) => {
            if (index === 0 || index === 2) {
                cy.wrap($el).should('have.css', 'border-color', 'rgb(210, 82, 225)')
            } else {
                cy.wrap($el).should('have.css', 'border-color', 'rgb(0, 50, 255)')
            }

            if (index === 0) expect($el).to.contain('c');
            if (index === 1) expect($el).to.contain('o');
            if (index === 2) expect($el).to.contain('w');
        });

        cy.wait(DELAY_IN_MS);

        cy.get('@circle')
        .each(($el, index) => {
            if (index === 0 || index === 2) {
                cy.wrap($el).should('have.css', 'border-color', 'rgb(127, 224, 81)')
            } else {
                cy.wrap($el).should('have.css', 'border-color', 'rgb(210, 82, 225)')
            }

            if (index === 0) expect($el).to.contain('w');
            if (index === 1) expect($el).to.contain('o');
            if (index === 2) expect($el).to.contain('c');
        });

        cy.wait(DELAY_IN_MS);

        cy.get('@circle')
        .each(($el, index) => {
            cy.wrap($el).should('have.css', 'border-color', 'rgb(127, 224, 81)');

            if (index === 0) expect($el).to.contain('w');
            if (index === 1) expect($el).to.contain('o');
            if (index === 2) expect($el).to.contain('c');
        });
    });
});