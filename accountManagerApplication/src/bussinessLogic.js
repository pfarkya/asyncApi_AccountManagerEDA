let dbInterface = require('./dbInteraction')
let asyncApiInterface = require('./api')
let { CloudEvent } = require('cloudevents')

async function createAccount(ceData) {
    let data = Object.assign({}, ceData.data)
    data.verificationSentAt = Date.now()
    let account = await dbInterface.updateAccount(data)
    let dataTosend = startAccountEmailVerification(account)
    asyncApiInterface.send(dataTosend, {}, 'startAccountEmailVerification')
}

async function completeAccountEmailVerification() {
    let data = Object.assign({}, ceData.data)
    data.verifiedAt = Date.now()
    await dbInterface.updateAccount(data)
}

function startAccountEmailVerification(data) {
    // generates the message and create the message that needs to publish
    let dataTosend = {}
    dataTosend.name = data.name
    dataTosend.email = data.email
    dataTosend.message = 'Please verify your email by clicking on the link http://someurl/verify?id=' + data.id
    return new CloudEvent({ type: 'account.start.verification', source: 'myApplication/startVerficaction', data: dataTosend });
}

module.exports = {
    createAccount,
    completeAccountEmailVerification
}