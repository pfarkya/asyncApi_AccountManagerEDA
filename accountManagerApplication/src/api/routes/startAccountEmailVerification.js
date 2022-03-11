const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const startAccountEmailVerificationHandler = require('../handlers/startAccountEmailVerification');
module.exports = router;

/**
 * information about verification has been initiated.
 */
router.useOutbound('startAccountEmailVerification', async (message, next) => {
  try {
    await validateMessage(message.payload,'startAccountEmailVerification','startAccountEmailVerification','subscribe');
    await startAccountEmailVerificationHandler.startAccountEmailVerification({message});
    next();
  } catch (e) {
    next(e);
  }
});
