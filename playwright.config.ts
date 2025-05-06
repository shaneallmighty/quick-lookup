import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/components', // Directory where your tests are located
  use: {
    baseURL: 'http://localhost:5713', // Replace with your app's URL
    headless: true, // Run tests in headless mode
    viewport: { width: 1280, height: 720 }, // Default viewport size
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    video: 'retain-on-failure', // Record video on test failure
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    // {
    //   name: 'Firefox',
    //   use: { browserName: 'firefox' },
    // },
    // {
    //   name: 'WebKit',
    //   use: { browserName: 'webkit' },
    // },
  ],
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]], // Use HTML reporter
});