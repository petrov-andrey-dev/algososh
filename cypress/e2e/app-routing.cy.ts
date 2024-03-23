describe('Приложение корректно работает с маршрутами', function() {
    beforeEach(function() {
      cy.visit('/');
    });
  
    it('should open main page by default', function() {
      cy.contains('Вдохновлено школами');
    });
  
    it('Должна открыться страница Строка при переходе по адресу /recursion', function() {
      cy.visit('/recursion');
      cy.contains('Строка');
    });
    it('Должна открыться страница Последовательность Фибоначчи при переходе по адресу /fibonacci', function() {
      cy.visit('/fibonacci');
      cy.contains('Последовательность Фибоначчи');
    });
    it('Должна открыться страница Сортировка массива при переходе по адресу /sorting', function() {
      cy.visit('/sorting');
      cy.contains('Сортировка массива');
    });
    it('Должна открыться страница Стек при переходе по адресу /stack', function() {
      cy.visit('/stack');
      cy.contains('Стек');
    });
    it('Должна открыться страница Очередь при переходе по адресу /queue', function() {
      cy.visit('/queue');
      cy.contains('Очередь');
    });
    it('Должна открыться страница Связный список при переходе по адресу /list', function() {
      cy.visit('/list');
      cy.contains('Связный список');
    });
  }); 