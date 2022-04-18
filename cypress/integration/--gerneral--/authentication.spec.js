describe('Authentication', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'));
    Cypress.Cookies.preserveOnce('jwt')
  });
  const protectedRoutes = Cypress.env('routes').filter((route) => {
    return route.protected === true;
  });
  context('Unauthenticated', () => {
    protectedRoutes.forEach((protectedRoute) => {
      it('protects ' + protectedRoute.path + ' from unautheticated users', () => {
        cy.visit(Cypress.env('baseUrl') + protectedRoute.path);
        cy.url().should('not.include', protectedRoute.path);
      });
    });
  });

  context('Authentication process', () => {
    it('should see google login button', () => {
      cy.get('button').contains('Login').click();
      cy.get('button').contains('Continue with google');
      //cy.url().should('include', 'accounts.google.com');
    });
    it('should allow a visitor to login via google', () => {
      //Arrange Act
      cy.loginByGoogleApi();
      //Assert
      cy.getCookie('jwt').should('exist');
    });
  });

  context('Authenticated', () => {
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('jwt');
    });
    protectedRoutes.forEach((protectedRoute) => {
      it('lets user access the protected route: ' + protectedRoute.path, () => {
        cy.visit(Cypress.env('baseUrl') + protectedRoute.path);
        cy.url().should('include', protectedRoute.path);
      });
    });
  });
});
