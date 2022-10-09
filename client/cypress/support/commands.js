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

import jwt from 'jsonwebtoken';

Cypress.Commands.add('loginByGoogleApi', () => {
  cy.log('Logging in to Google');
  cy.request({
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    body: {
      grant_type: 'refresh_token',
      client_id: Cypress.env('googleClientId'),
      client_secret: Cypress.env('googleClientSecret'),
      refresh_token: Cypress.env('googleRefreshToken'),
    },
  }).then(({ body }) => {
    const { access_token, id_token } = body;

    cy.request({
      method: 'GET',
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      headers: { Authorization: `Bearer ${access_token}` },
    }).then(({ body }) => {
      cy.log(body);

      const tokenRaw = {
        user: {
          id: body.sub,
          fullName: body.given_name +" " +body.family_name,
          email: body.email,
          stripeId: "cus_Kza1oi2OTlvcpb",
        },
      };

      const token = jwt.sign(tokenRaw, Cypress.env('serverSecret') ?? '', {
        expiresIn: '1d',
      });
      cy.setCookie("jwt", token, {httpOnly:true, sameSite: "lax"})

      //cy.visit('http://localhost:3000');
    });
  });
});


 
// Custom method to check for dynamic class names
Cypress.Commands.add('hasClass', () => {});