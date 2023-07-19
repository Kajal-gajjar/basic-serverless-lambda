import { CodePipeline } from 'aws-sdk';
const pipeline = new CodePipeline();

export async function generateRandomNumber(event) {
  const randomNumber = parseInt(Math.random() * 100);
  console.log('The random generated integer is:', randomNumber);

  // Call PutJobSuccessResult to notify CodePipeline of successful execution
  const params = {
    jobId: event['CodePipeline.job']['id'],
  };

  try {
    // PutJobSuccessResult does not return any data, so you don't need to store the response
    await pipeline.putJobSuccessResult(params).promise();
  } catch (error) {
    console.error('Error calling PutJobSuccessResult:', error);
    throw error;
  }

  return randomNumber;
}
