describe('Страница Связный список работает корректно', () => {
  beforeEach(() => {
    cy.visit('/list');
    cy.get('[class^=circle_circle]').as('circle');
  });

  it('Все кнопки добавления и кнопка удалевения по индексу недоступны если инпуте пусто', () => {
    cy.get('input').should('be.empty');
    cy.contains('Добавить в head').should('be.disabled');
    cy.contains('Добавить в tail').should('be.disabled');
    cy.contains('Добавить по индексу').should('be.disabled');
    cy.contains('Удалить по индексу').should('be.disabled');
  });

  it('Дефолтный список отрисовывается корректно', () => {
    cy.get('@circle').should('have.length', 4);
    cy.get('@circle')
      .should('have.css', 'border-color', 'rgb(0, 50, 255)')
      .should('not.be.empty');
    cy.get('@circle').first().prev().should('contain', 'head');
    cy.get('@circle').last().next().next().should('contain', 'tail');
  });

  it('Элемент добавляется в head правильно', () => {
    cy.get('input').first().type('1');
    cy.contains('Добавить в head').click();
    cy.get('@circle').should('have.length', 5);
    cy.get('@circle').first()
      .should('have.css', 'border-color', 'rgb(210, 82, 225)')
      .should('contain.text', '1');
    cy.get('@circle').first()
      .should('have.css', 'border-color', 'rgb(127, 224, 81)')
      .should('contain.text', '1')
      .prev().should('contain', 'head');
    cy.get('@circle').first()
      .should('have.css', 'border-color', 'rgb(0, 50, 255)')
      .should('contain.text', '1')
      .prev().should('contain', 'head');
    cy.contains('Добавить в head').should('be.disabled');
  });

  it('Элемент добавляется в tail правильно', () => {
    cy.get('input').first().type('2');
    cy.contains('Добавить в tail').click();
    cy.get('@circle').should('have.length', 5);
    cy.get('@circle').eq(3)
      .should('have.css', 'border-color', 'rgb(210, 82, 225)')
      .should('contain.text', '2');
    cy.get('@circle').last()
      .should('have.css', 'border-color', 'rgb(127, 224, 81)')
      .should('contain.text', '2')
      .next().next().should('contain', 'tail');
    cy.get('@circle').last()
      .should('have.css', 'border-color', 'rgb(0, 50, 255)')
      .should('contain.text', '2')
      .next().next().should('contain', 'tail');
    cy.contains('Добавить в tail').should('be.disabled');
  });

  it('Элемент добавляется по индексу правильно', () => {
    cy.get('input').first().type('3');
    cy.get('input').last().type('1')
    cy.contains('Добавить по индексу').click();
    cy.get('@circle').eq(0)
      .should('have.css', 'border-color', 'rgb(210, 82, 225)')
      .should('contain.text', '3');
    cy.get('@circle').eq(1)
      .should('have.css', 'border-color', 'rgb(210, 82, 225)')
      .should('contain.text', '3');
    cy.get('@circle').eq(0)
      .should('have.css', 'border-color', 'rgb(210, 82, 225)')
      .should('not.contain.text', '3')
      .prev().should('contain', 'head');
    cy.get('@circle').eq(1)
      .should('have.css', 'border-color', 'rgb(127, 224, 81)')
      .should('contain.text', '3');
    cy.get('@circle').eq(0)
      .should('have.css', 'border-color', 'rgb(0, 50, 255)')
      .should('not.contain.text', '3')
      .prev().should('contain', 'head');
    cy.get('@circle').eq(1)
      .should('have.css', 'border-color', 'rgb(0, 50, 255)')
      .should('contain.text', '3');
    cy.contains('Добавить по индексу').should('be.disabled');
  });

  it('Элемент удаляется из head правильно', () => {
    cy.get('@circle').first().then(($p) => {
      const value = $p.text();
      cy.contains('Удалить из head').click();
      cy.get('@circle').first().should('not.contain.text');
      cy.get('@circle').eq(1)
        .should('contain.text', value)
        .should('have.css', 'border-color', 'rgb(210, 82, 225)');
      cy.get('@circle').should('have.length', 3);
    });
  });

  it('Элемент удаляется из tail правильно', () => {
    cy.get('@circle').last().then(($p) => {
      const value = $p.text();
      cy.contains('Удалить из tail').click();
      cy.get('@circle').eq(3).should('not.contain.text');
      cy.get('@circle').last()
        .should('contain.text', value)
        .should('have.css', 'border-color', 'rgb(210, 82, 225)');
      cy.get('@circle').should('have.length', 3);
    });
  });

  it('Элемент удаляется из tail правильно', () => {
    cy.get('@circle').eq(2).then(($p) => {
      const value = $p.text();
      cy.get('input').last().type('2')
      cy.contains('Удалить по индексу').click();
      cy.get('@circle').eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      cy.get('@circle').eq(1).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      cy.get('@circle').eq(2).should('have.css', 'border-color', 'rgb(210, 82, 225)');
      cy.get('@circle').eq(2)
        .should('not.contain.text')
        .should('have.css', 'border-color', 'rgb(0, 50, 255)')
      cy.get('@circle').eq(3)
        .should('contain.text', value)
        .should('have.css', 'border-color', 'rgb(210, 82, 225)');
    });
  });
});