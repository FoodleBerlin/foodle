// <reference types=cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

require('dotenv').config()
 const config =  (on, config) => {
  // copy any needed variables from process.env to config.env
  config.env.googleRefreshToken = process.env.NEXT_PUBLIC_CYPRESS_GOOGLE_REFRESH_TOKEN;
  config.env.googleClientId = process.env.GOOGLE_CLIENT_ID;
  config.env.googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  config.env.serverSecret = process.env.SERVER_SECRET;
  console.log("Refresh Token: ",process.env.NEXT_PUBLIC_CYPRESS_GOOGLE_REFRESH_TOKEN);
  console.log("Server Secret: ",process.env.SERVER_SECRET);
  // do not forget to return the changed config object!
  return config
}
export default config