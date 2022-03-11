const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const createAccountHandler = require('../handlers/createAccount');
module.exports = router;

router.use('createAccount', async (message, next) => {
  try {
    await validateMessage(message.payload,'createAccount','createAccount','publish');
    await createAccountHandler.createAccount({message});
    next();
  } catch (e) {
    next(e);
  }
});
