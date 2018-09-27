// Get a uuid for partition purposes
// Only try n times before failing.

import { v4 as uuid } from 'uuid';
import { FindUUIDParams, PartitionUUIDResult } from './common';


interface Callback {
  (err: Error | null, data: PartitionUUIDResult | null): void;
}

// Classic Synchronous functions Locking thread
function findUUIDSync(params: FindUUIDParams): PartitionUUIDResult {

  let result = uuid();
  let maxTries = 0;

  while (result.charAt(0) !== params.startHex && maxTries++ < params.tryAmount) {
    result = uuid();
  }
  if (maxTries >= params.tryAmount) {
    throw new Error("Could not find one");
  }
  return { result, tries: maxTries };

}

function sendToServerSync(uuid: string) {
  return;
}


// Async using callbacks (AVOID!!!)
function findUUIDAsyncCallback(params: FindUUIDParams, callback: Callback) {
  setTimeout(() => {

    try {
      const result = findUUIDSync(params);
      callback(null, result);
    } catch (error) {
      callback(error, null);
    }

  }, 3000);

  return;
}

function sendToServerAsyncCallback(uuid: string, callback: Callback) {
  setTimeout(() => {
    callback(null, null);
  }, 3000);

  return;
}

// Async with promises.
async function findUUIDAsync(params: FindUUIDParams): Promise<PartitionUUIDResult> {
  return new Promise((resolve: (r: PartitionUUIDResult) => void, reject) => {
    setTimeout(() => {
      try {
        const result = findUUIDSync(params);
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    }, 2000);
  });
}

async function sendToServerAsync(uuid: string): Promise<{}> {

  return new Promise((resolve: () => void, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}


// Executions: 


// Asynchronous with callbacks (hell).
findUUIDAsyncCallback({ startHex: '9', tryAmount: 10000 }, (err: Error | null, data: PartitionUUIDResult | null) => {
  
  sendToServerAsyncCallback(data!.result, () => {
    console.log('ASYNC CALLBACK: FINISHED!', data!);
  });

});

// Chaining promises style.
findUUIDAsync({ startHex: '9', tryAmount: 10000 })
.then((result: PartitionUUIDResult) => {
  // Nothing, just for fun
  return result;
})
.then((result: PartitionUUIDResult) => {
  // Proving that I can join
  return result;
})
.then((result: PartitionUUIDResult) => {
  return sendToServerAsync(result.result).then(() => {return result});
})
.then((result: PartitionUUIDResult) => {
  console.log('ASYNC/PROMISE FINISHED!!!', result);
})
.catch((error: Error) => {
  console.log('Something went terribly wrong...');
});


// Synchronous executions
try {
  const result = findUUIDSync({ startHex: '9', tryAmount: 10000 });
  sendToServerSync(result.result);
  console.log('SYNC FINISHED', result);
} catch (err) {
  console.error('SYNCERR', err);
}


// ES6 async/await for the win!! (needs to be inside an async block.)
async function processAsyncAwait(){
    try{
      const asyncResult = await findUUIDAsync({ startHex: '9', tryAmount: 10000 });
      await sendToServerAsync(asyncResult.result);
      console.log('ASYNC/AWAIT FINISHED!!!', asyncResult);
    }catch(err){
      console.error(err);
    }
}
processAsyncAwait();

// Expected: 
// Even though sync code is called last, it is blocking in nature and will finish last (we can intruduce a fake wait so we guarantee that it finished after the others, no point.)
// The async calls happen after the timeout and then complete. 
// It is better to use the last options (with async/await for readability and predictability when possible.)
