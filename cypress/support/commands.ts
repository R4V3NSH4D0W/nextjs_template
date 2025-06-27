// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Disable ESLint namespace rule for Cypress global declarations
/* eslint-disable @typescript-eslint/no-namespace */

/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to login with username and password
       * @example cy.login('user@example.com', 'password')
       */
      login(email: string, password: string): Chainable<void>;

      /**
       * Custom command to check accessibility
       * @example cy.checkAccessibility()
       */
      checkAccessibility(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('dataCy', (value: string) => {
  return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('form').submit();
    cy.url().should('not.include', '/login');
  });
});

Cypress.Commands.add('checkAccessibility', () => {
  cy.injectAxe();
  cy.checkA11y(null, null, cy.terminalLog);
});

export {};
