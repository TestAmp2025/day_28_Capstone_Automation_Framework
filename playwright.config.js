// @ts-check
import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.GITHUB_ACTIONS;

export default defineConfig({
  testDir: './tests',

  // 🕒 Global timeouts
  timeout: 30_000,
  expect: { timeout: 5_000 },

  retries: isCI ? 2 : 0,

  // run tests in files in parallel
  fullyParallel: true,

  // let Playwright choose a good number of workers (parallel runs)
  // (you can override on CLI with --workers=6, etc.)
  workers: isCI ? 2 : '100%',

  // 📦 Test output folders
  outputDir: 'test-results',
  
  // 📊 Reporters
  reporter: [
    ['github'],
    ['html', { open: 'never' }],
    ['allure-playwright', { 
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: true
    }]
  ],

  use: {
    // 💻 Full HD viewport (simulates full-screen desktop)
    viewport: { width: 1920, height: 1080 },

    // ⏱ Action & navigation timeouts
    actionTimeout: 10_000,
    navigationTimeout: 20_000,

    // 🎥 Debug artifacts
    trace: isCI ? 'retain-on-failure' : 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // 🌐 Base URL (optional)
    baseURL: 'https://k12-harmony-hub.lovable.app',
  },

  // 🌍 Multi-browser projects
  projects: [
    { 
      name: 'chromium', 
      use: { ...devices['Desktop Chrome'] } 
    },
    // { 
    //   name: 'firefox',  
    //   use: { ...devices['Desktop Firefox'] } 
    // },
    // { 
    //   name: 'webkit',   
    //   use: { ...devices['Desktop Safari'] } 
    // },
    // {
    //   name: 'edge',
    //   use: {
    //     ...devices['Desktop Edge'],
    //     channel: 'msedge', // runs real Microsoft Edge
    //   },
    // },
  ],
});