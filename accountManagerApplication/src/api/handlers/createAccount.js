
const businessLogic = require('../../bussinessLogic')
let { Kafka } = require('cloudevents')
const handler = module.exports = {};


/**
 * 
 * @param {object} options
 * @param {object} options.message
 */
handler.createAccount = async ({message}) => {
  // Implement your business logic here...
  // Update the DB
  // send Publish to startAccountEmailVerification
  let value = JSON.stringify(message.payload)
  let ceData= Kafka.toEvent({headers: {'content-type': 'application/cloudevents+json'}, value})
  await businessLogic.createAccount(ceData)
  
};
