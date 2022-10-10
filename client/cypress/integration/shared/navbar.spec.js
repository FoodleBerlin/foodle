describe('Navbar', () => {
  context('Visibility', () => {
    beforeEach(() => {
      cy.visit(Cypress.env('baseUrl'));
    });
    console.log('Routes:', Cypress.env('routes'));
    const routes = Cypress.env('routes').filter((route) => {
      return route.withNavbar === true;
    });
    console.log(routes.length);
    routes.forEach((route) => {
      console.log('Route with Navbar');
      it(`is visible on ${route.path} route `, () => {
        if (route.protected) {
          cy.loginByGoogleApi();
        }
        cy.visit(Cypress.env('baseUrl') + route.path);
        cy.get('*[class^="Navbar_navbar"]').should('be.visible');
      });
    });
  });
  context('Navigation', () => {
    it('navigates to the login/signup page', () => {
      cy.visit(Cypress.env('baseUrl'));
      cy.get('button').contains('Sign Up With Google');
    });
  });
});
