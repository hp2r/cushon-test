describe('cushon e2e spec', () => {
  it('checks the page exists', () => {
    cy.visit('');
    cy.contains(/Welcome/).should('exist');
    cy.contains(/Your balance:/).should('exist');
    cy.get('[data-cy="view-history-btn"]').should('exist');
  });

  it('loads directly to Transaction History page', () => {
    cy.visit('/history');
    cy.contains(/Transaction History/).should('exist');
  });

  it('clicks a product and checks running total when units are added', () => {
    cy.visit('');
    cy.get('[data-cy="1-row"]').click();
    cy.get('[data-cy="units-1-input"]').type('1');
    cy.contains(/Balance after purchase: 9000/).should('exist');
    cy.get('[data-cy="units-1-input"]').clear().type('{selectall}{backspace}');
    cy.contains(/Balance after purchase: 10000/).should('exist');
    cy.get('[data-cy="units-1-input"]').type('2');
    cy.get('[data-cy="units-1-input"]').clear().type('{backspace}');
    cy.contains(/Balance after purchase: 8000/).should('exist');
  });

  it('disables the buy button when the user has insufficient funds', () => {
    cy.visit('');
    cy.get('[data-cy="1-row"]').click();
    cy.get('[data-cy="units-1-input"]').type('11');
    cy.get('[data-cy="transaction-action-btn"]').should('be.disabled');
  });
})