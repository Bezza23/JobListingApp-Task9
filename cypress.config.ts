// cypress.config.ts

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // --- THIS IS THE LINE TO ADD ---
    // This tells Cypress where your app is running.
    baseUrl: 'http://localhost:3000',

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});