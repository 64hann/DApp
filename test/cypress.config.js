const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1366,
  viewportHeight: 768,

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        launchOptions.extensions.push(
          // ENTER THE PATH TO METAMASK EXTENSION HERE
          "/Users/weiguanghan/Library/Application Support/Google/Chrome/Default/Extensions/nkbihfbeogaeaoehlefnkodbefgpgknn/11.5.1_0"
        );
        return launchOptions;
        // implement node event listeners here
      });
    },
  },
});
