// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('addRecord', (name, number, email) => {
   
    cy.get("div>input[placeholder='Name']").type(name);
    cy.get("div>input[placeholder='Phone']").type(number);
    cy.get("div>input[placeholder='Email']").type(email);
    cy.get("button[name='add']").click();
  });

  Cypress.Commands.add('assertRecordAdded', (name, number, email) => {
    cy.get('tbody > :nth-child(2) > :nth-child(1)').should('contain', name);
    cy.get('tbody > :nth-child(2) > :nth-child(2)').should('contain', number);
    cy.get('tbody > :nth-child(2) > :nth-child(3)').should('contain', email);
  });

  Cypress.Commands.add('addMultipleRecords', (record) => {
    cy.get("div>input[placeholder='Name']").type(record.name);
    cy.get("div>input[placeholder='Phone']").type(record.number);
    cy.get("div>input[placeholder='Email']").type(record.email);
    cy.get("button[name='add']").click();
  });
  Cypress.Commands.add('readMultipleRecords', (record) => {
    cy.get("table>tbody").contains('tr', record.name).should('be.visible');
    cy.get("table>tbody").contains('tr', record.number).should('be.visible');
    cy.get("table>tbody").contains('tr', record.email).should('be.visible');
  });