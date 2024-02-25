// app.config.js
const appJson = require('./app.json');

module.exports = ({ config }) => {
  // Dynamically set the path to GoogleService-Info.plist
  // This example assumes the file is stored as a base64-encoded secret in an environment variable
  // You can adjust the logic as needed based on your actual setup

  // Ensure ios object exists in the config
  if (!config.ios) {
    config.ios = {};
  }

  // Specify the path to GoogleService-Info.plist
  // This example directly sets the path, assuming the file will be placed correctly in your CI/CD pipeline
  // If handling the file as a secret, you'd include logic here to decode it from an environment variable and save it as a file
  config.ios.googleServicesFile = './GoogleService-Info.plist';

  return {
    ...appJson,
    ...config,
    // Optionally, add any dynamic configurations here
  };
};
