require('dotenv').config();

// playwright.config.js
const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './',
  use: {
    browserName: 'chromium',
    headless: false, // obligatoriu false ca să vezi ce depanezi
  },
});
