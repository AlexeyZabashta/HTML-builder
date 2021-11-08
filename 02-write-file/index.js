const fs = require('fs');
const proc = require('process');
const readline = require('readline');
const writeableStream = fs.createWriteStream('02-write-file/hello.txt');
//const readableStream = fs.createReadStream('02-write-file/hello.txt', 'utf8');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout  
});
console.log('Hello, enter info: ');

proc.on('exit', () => {
  console.log('Good bye!');
});

rl.on('line', (input) => {
  
  if (input==='exit'){    
    rl.close();   
  }else{
    writeableStream.write(`\n${input}\n`); 
  } 
   
});

/*rl.question('Enter info for file', (answer) => {
  fs.appendFile('02-write-file/file.txt',answer, (err) => {
    if(err) throw err;
    console.log('Data has been added!');
  });
});*/


/*const fs = require('fs');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

let writeableStream = fs.createWriteStream('02-write-file/hello.txt');
let readableStream = fs.createReadStream('02-write-file/hello.txt', 'utf8');
const rl = readline.createInterface({ input, output });
rl.question('Enter info for file', (answer) => {
  writeableStream.write(answer);
  readableStream.on('data', function(chunk){ 
    console.log(chunk);
  });    
  rl.close();
});

rl.on('line', (input) => {
  writeableStream.write(input);
  console.log(`Received: ${input}`);
});


//writeableStream.write('Привет мир!');
//writeableStream.write('Продолжение записи \n');
//writeableStream.end('Завершение записи');

 




/*function fileHandler(){

  fs.open('02-write-file/file.txt', 'w', (err) => {
    if(err) throw err;
    console.log('File created');
  });
  fs.appendFile('02-write-file/file.txt', ' This line is beyond the end.', (err) => {
    if(err) throw err;
    console.log('Data has been added!');
  });
  
}
fileHandler();*/