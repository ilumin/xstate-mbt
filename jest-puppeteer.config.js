module.exports = {
  server: {
    command: `BROWSER=none npm start`,
    port: 3000,
    launchTimeout: 5000,
  },
  launch: {
    headless: false,
    slowMo: 50,
  },
}
