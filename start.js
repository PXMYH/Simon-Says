const app = require("./app");

// ATTENTION!
// For Heroku deployment, since $PORT from Heroku is dynamically assigned
// we MUST listen and bind to the dynamic port in Heroku Dyno
// also we MUST NOT use default localhost 127.0.0.1, it HAS to be 0.0.0.0
// for app port to bind
// Resource:
// https://help.heroku.com/P1AVPANS/why-is-my-node-js-app-crashing-with-an-r10-error
// https://github.com/keystonejs/keystone/issues/3994
const port = process.env.PORT || 3000;
const host = "0.0.0.0";
const server = app.listen(port, host, function() {
  console.log(`Express is running on port ${server.address().port}`);
});
