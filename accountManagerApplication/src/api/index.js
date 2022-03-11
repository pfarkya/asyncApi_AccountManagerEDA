const Hermes = require('hermesjs');
const app = new Hermes();
const path = require('path');
const { yellow, gray, cyan } = require('chalk');
const buffer2string = require('./middlewares/buffer2string');
const string2json = require('./middlewares/string2json');
const json2string = require('./middlewares/json2string');
const logger = require('./middlewares/logger');
const errorLogger = require('./middlewares/error-logger');
const config = require('../lib/config');
const serverConfig = config.broker.kafka;
const KafkaAdapter = require('hermesjs-kafka');
const startAccountEmailVerification = require('./routes/startAccountEmailVerification.js');
const createAccount = require('./routes/createAccount.js');
const completeAccountEmailVerification = require('./routes/completeAccountEmailVerification.js');

app.addAdapter(KafkaAdapter, serverConfig);

app.use(buffer2string);
app.use(string2json);
app.use(logger);

// Channels
console.log(yellow.bold.inverse(' PUB '), gray('Will eventually publish to'), yellow('startAccountEmailVerification'));
app.useOutbound(startAccountEmailVerification);
console.log(cyan.bold.inverse(' SUB '), gray('Subscribed to'), yellow('createAccount'));
app.use(createAccount);
console.log(cyan.bold.inverse(' SUB '), gray('Subscribed to'), yellow('completeAccountEmailVerification'));
app.use(completeAccountEmailVerification);

app.use(errorLogger);
app.useOutbound(errorLogger);
app.useOutbound(logger);
app.useOutbound(json2string);

app
  .listen()
  .then((adapters) => {
    console.log(cyan.underline(`${config.app.name} ${config.app.version}`), gray('is ready!'), '\n');
    adapters.forEach(adapter => {
      console.log('🔗 ', adapter.name(), gray('is connected!'));
    });
  })
  .catch(console.error);


module.exports = app