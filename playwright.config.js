const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30000,
  // retries: 1,
  use: {
    headless: true,
    baseURL: "https://vieclam.ueh.edu.vn/",
  },
  projects: [
    { name: "setup", testMatch: /.*\.setup\.js/ },
    
    {
      name: "logged-in", 
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/user.json", 
      },
      dependencies: ["setup"],
    },
    
    {
      name: "guest", 
      use: {
        ...devices["Desktop Firefox"],
      },
      dependencies: ["setup"], 
    },
    
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        storageState: ".auth/user.json", 
      },
      dependencies: ["setup"], 
    },
  ],
});
