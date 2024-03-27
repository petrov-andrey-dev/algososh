describe('Страница Очередь работает корректно', () => {
    const array = ['1', '2', '3'];
    
    beforeEach(() => {
      cy.visit('/queue');
      cy.get('[class^=circle_circle]').as('circle');
    });

    it('Кнопка Добавить недоступна если инпуте пусто', () => {
        cy.get('input').should('be.empty');
        cy.contains('Добавить').should('be.disabled');
    });

    it('Элмент добавляется в очередь правильно', () => {
      array.forEach((item, arrIndex) => {
        cy.get('input').type(item);
        cy.contains('Добавить').click();
        cy.get('@circle').eq(arrIndex).should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.get('@circle').eq(arrIndex).should('have.css', 'border-color', 'rgb(0, 50, 255)');
        cy.get('@circle').eq(arrIndex).contains(item);
        cy.get('@circle').eq(arrIndex).next().next().contains('tail')
        cy.contains('Добавить').should('be.disabled');
      });
    });

    it('Элемент удаляется правильно', () => {
      array.forEach(i => {
        cy.get('input').type(i);
        cy.contains('Добавить').click();
        cy.contains('Добавить').should('be.disabled');
      });
      for (let i = 0; i < array.length; i++) {
        cy.contains('Удалить').click();
        cy.get('@circle').eq(i).should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.get('@circle').eq(i).contains(array[i]);
        cy.get('@circle').eq(i).should('have.css', 'border-color', 'rgb(0, 50, 255)');
        cy.get('@circle').eq(i).should('not.include.text', array[i])
        if (i !== array.length -1) {
          cy.get('@circle').eq(i + 1).prev().contains('head')
        } else {
          cy.get('@circle').prev().should('not.include.text', 'head')
          cy.get('@circle').next().next().should('not.include.text', 'tail')
        }
      }
    });

    it('Очистка очереди работает правильно', () => {
      array.forEach(i => {
        cy.get('input').type(i);
        cy.contains('Добавить').click();
        cy.contains('Добавить').should('be.disabled');
      })
      cy.contains('Очистить').click();
      cy.get('@circle').should('not.include.text');
      cy.get('@circle').should('have.css', 'border-color', 'rgb(0, 50, 255)');
      cy.get('@circle').prev().should('not.include.text', 'head')
      cy.get('@circle').next().next().should('not.include.text', 'tail')
    });
});