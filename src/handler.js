// import { CodePipeline } from 'aws-sdk';
// const pipeline = new CodePipeline();

// export async function generateRandomNumber(event) {
//   const randomNumber = parseInt(Math.random() * 100);
//   console.log('The random generated integer is:', randomNumber);

//   // Call PutJobSuccessResult to notify CodePipeline of successful execution
//   const params = {
//     jobId: event['CodePipeline.job']['id'],
//   };

//   try {
//     // PutJobSuccessResult does not return any data, so you don't need to store the response
//     await pipeline.putJobSuccessResult(params).promise();
//   } catch (error) {
//     console.error('Error calling PutJobSuccessResult:', error);
//     throw error;
//   }

//   return randomNumber;
// }


// Working Base response code for CodePipeline  
  
'use strict';  
const aws = require('aws-sdk');  
const codepipeline = new aws.CodePipeline();  
  
let environment = 'dev';  
let callback;  
let context = {  
    invokeid: ''  
}  
  
exports.handler = async (event, context, callback) => {  
    context = context;  
    callback = callback;  
    console.log('Inside deploy-website Lambda');  
    if (!('CodePipeline.job' in event)) {  
        return Promise.resolve();  
    }  
    // Retrieve the Job ID from the Lambda action  
    let jobId;  
    if (event\["CodePipeline.job"]) {  
        jobId = event\["CodePipeline.job"].id;  
  
        // Retrieve the value of UserParameters from the Lambda action configuration in AWS CodePipeline, in this case the environment  
        // to deploy to from this function  
        environment = event\["CodePipeline.job"].data.actionConfiguration.configuration.UserParameters || environment;  
    }  
  
    console.log(`Envrionment: ${environment}`);  
  
  
    console.log('Copy Successful');  
    console.log('Entering Results');  
    return await putJobSuccess('Copy Successful', jobId);  
}  
  
// Notify AWS CodePipeline of a successful job  
async function putJobSuccess(message, jobId) {  
    console.log(`Post Job Success For JobID: ${jobId}`);  
    const params = {  
        jobId: jobId  
    };  
    console.log(`Job Success Params: ${JSON.stringify(params)}`);  
    await codepipeline.putJobSuccessResult(params).promise();  
    console.log('Job Success: Successfully reported hook results');  
    return callback(null, 'Job Success: Successfully reported hook results');  
}