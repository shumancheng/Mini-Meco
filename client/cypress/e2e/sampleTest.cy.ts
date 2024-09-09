/// <reference types="cypress" />

describe('My First Test', () => {
    it('Visits the app URL', () => {
      cy.visit('/login');
      cy.contains('Welcome to Mini-Meco');
    });
  });
  