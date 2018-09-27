import { v4 as uuid } from 'uuid';
import { FindUUIDParams, PartitionUUIDResult } from './common';


// Generators are special functions (mind the *) that can pause and resume executions at any point without losing context.
function* nextUUID(params: FindUUIDParams): IterableIterator<PartitionUUIDResult>{
  let result = uuid();
  let maxTries = 0;

  while (maxTries < params.tryAmount) {

    if(result.charAt(0) === params.startHex){
      // Generators that resume knowing new information.
      const returnValue = yield { result, tries: maxTries };
      console.log('At index: ', returnValue);
    }
    result = uuid();
    maxTries++;
  }
  return;
}

const limit = 100;
const generator = nextUUID({ startHex: '9', tryAmount: limit });


// Allegedly we will take more than 100 iterations to find 100 uuids starting with '9'
for(let i = 0; i < limit; i++){

  const f =  generator.next(i);
  if(!f.done){
    console.log('UUID', f.value); 
  }else{
    console.log('UUID', f); 
    break;
  }

}