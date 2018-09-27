// Get a uuid for partition purposes
// Only try n times before failing.


import { v4 as uuid } from 'uuid';

type FindUUIDParams = {
  startHex: string,
  tryAmount: number
};

type Return = {
  result: string,
  tries: number
};

interface Callback {
  (err: Error | null, data: Return | null): void;
}

function findUUIDSync(params: FindUUIDParams): Return {

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
  console.log('SENT TO SERVER!!!');
}

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


async function findUUIDAsync(params: FindUUIDParams): Promise<Return> {


  return new Promise((resolve: (r: Return) => void, reject) => {
    setTimeout(() => {
      try {
        const result = findUUIDSync(params);
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    }, 0);
  });

}


function sendToServerAsyncCallback(uuid: string, callback: Callback) {
  setTimeout(() => {

    console.log('SENT TO SERVER!!!');
    callback(null, null);

  }, 0);

  return;
}

async function sendToServerAsync(uuid: string): Promise<Return> {

  return new Promise((resolve: (r: Return) => void, reject) => {
    setTimeout(() => {

      console.log('SENT TO SERVER!!!');
      return ({});

    }, 0);
  });
}


findUUIDAsyncCallback({ startHex: '9', tryAmount: 10000 }, (err: Error | null, data: Return | null) => {
  console.log('ASYNC: ', err, data);

  sendToServerAsyncCallback(data!.result, () => {
    console.log('ASYNC: FINISHED!');
  });


});


try {
  const result = findUUIDSync({ startHex: '9', tryAmount: 10000 });
  sendToServerSync(result.result);
  console.log('SYNC FINISHED', result);
} catch (err) {
  console.error('SYNCERR', err);
}


async function process(){
    const asyncResult = await findUUIDAsync({ startHex: '9', tryAmount: 10000 });
    await sendToServerAsync(asyncResult.result);   
}


function* nextUUID(params: FindUUIDParams){
  let result = uuid();
  let maxTries = 0;

  while (maxTries < 100) {

    if(result.charAt(0) === params.startHex){
      const returnValue = yield { result, tries: maxTries };
      console.log(returnValue);
    }
    result = uuid();
    maxTries++;
  }
  return;
}


const generator = nextUUID({ startHex: '9', tryAmount: 10000 });
console.log(generator);

let i = 0;
for(i = 0; i < 100; i++){

  const f =  generator.next('Okay'+i);
  if(!f.done){
    console.log('UUID', f.value); 
  }else{
    console.log('UUID', f); 
    break;
  }

}









