import dotenv from 'dotenv';
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import HttpException from './utils/HttpException.utils'
import errorMiddleware from './middlewares/error.middleware'
import { errors, jsonError, jsonSuccess, logger } from './utils/system'
import { environments } from './config/framework'
import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'

// -- load env
dotenv.config();
if (!environments || environments.length === 0) {
  logger.error('At least one environment must be set')
  throw jsonError(errors.SYSTEM_ERROR)
}
global.env = process.env.NODE_ENV || 'DEV'

if (environments.indexOf(global.env) < 0) {
  logger.error('Environment not found')
  throw errors.SYSTEM_ERROR
}
try {
  const env = dotenv.parse(fs.readFileSync(path.join(__dirname, `../env/${global.env}.env`)))
  process.env = Object.assign({}, env, process.env)
  logger.info(`Current environment: ${global.env}`)
} catch (err) {
  // eslint-disable-next-line
  logger.error(`File not found: ${env}.env`)
  throw errors.SYSTEM_ERROR
}
global.getEnv = (key, defaultValue) => {
  key = `${global.env}_${key}`
  if (process.env[key] !== null && process.env[key] !== undefined) {
    return process.env[key]
  }
  if (defaultValue !== undefined) {
    return defaultValue
  }
  logger.error(key)
  throw errors.ENV_NOT_SET_ERROR
}

const app = express();
// This line is from the Node.js HTTPS documentation.
// var sslserver = {
//   key: fs.readFileSync('/etc/ssl/private/apache-selfsigned.key'),
//   cert: fs.readFileSync('/etc/ssl/certs/apache-selfsigned.crt')
// };

var corsOptions = {
  origin: "https://localhost:8030"
};
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});


require("./routes/user.routes")(app);

// require("./routes/product.routes")(app);
// require("./routes/scanner.routes")(app);

// 404 error
app.all('*', (req, res, next) => {
  const err = new HttpException(404, 'Endpoint Not Found');
  next(err);
});

// Error middleware
app.use(errorMiddleware);
// set port, listen for requests
const PORT = process.env.PORT || 8020;

const httpServer = http.createServer(app);
const httpsServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
}, app);


httpServer.listen(PORT, () => {
  console.log(`HTTP Server running on port ${PORT}`);
});

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
