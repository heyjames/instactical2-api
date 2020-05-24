// Note: This index.js file should be the orchestrator. Avoid going into detail with code here.

// Do this at startup:
// 1) set NODE_ENV=development
// 2) set inst_jwtPrivateKey=1234 (npm i config)
// 3) (npm i debug)
// "set DEBUG=app:*", 
// "set DEBUG=app:startup", 
// "set DEBUG=", 
// "set DEBUG=app:startup,app:db", 
// Shortcut=>"DEBUG=app:startup nodemon index.js" 
// to tell the module to only show us certain types

// const logger = require("./middleware/logger");
// app.use(logger);

const express = require("express");
const app = express();
var { logger } = require('./middleware/logger');

require("./startup/logging")(); // Note: this is placed first.
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")(app);

const port = 3001;
app.listen(port, function () { logger.info(`Listening on port ${port}...`) });