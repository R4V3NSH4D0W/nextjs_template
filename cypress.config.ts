import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: './cypress/support/e2e.ts',
    specPattern: './cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    videosFolder: './cypress/videos',
    screenshotsFolder: './cypress/screenshots',
    video: true,
    screenshot: 'on',
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    supportFile: './cypress/support/component.ts',
    specPattern: './cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    indexHtmlFile: './cypress/support/component-index.html',
  },
});
