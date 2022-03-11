
let { Kafka } = require('cloudevents')
const handler = module.exports = {};

/**
 * 
 * @param {object} options
 * @param {object} options.message
 */
handler.completeAccountEmailVerification = async ({message}) => {
  // Implement your business logic here...
  let value = JSON.stringify(message.payload)
  let ceData= Kafka.toEvent({headers: {'content-type': 'application/cloudevents+json'}, value})
  await businessLogic.completeAccountEmailVerification(ceData)
};
