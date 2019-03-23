const app = require("./app");

const port = process.env.PORT || 3000;
const host = "0.0.0.0";
const server = app.listen(port, host, function() {
  console.log(`Express is running on port ${server.address().port}`);
});
