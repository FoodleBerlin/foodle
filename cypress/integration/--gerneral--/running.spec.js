describe('App-general', () => {
  context('Foodle-website', () => {
    it('runs and shows content', () => {
      cy.visit(Cypress.env('baseUrl'));
      cy.contains('Renting kitchens just got easier.');
    });
  });
});
