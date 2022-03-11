const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const completeAccountEmailVerificationHandler = require('../handlers/completeAccountEmailVerification');
module.exports = router;

router.use('completeAccountEmailVerification', async (message, next) => {
  try {
    await validateMessage(message.payload,'completeAccountEmailVerification','completeAccountEmailVerification','publish');
    await completeAccountEmailVerificationHandler.completeAccountEmailVerification({message});
    next();
  } catch (e) {
    next(e);
  }
});
