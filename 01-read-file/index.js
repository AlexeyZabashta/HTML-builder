const fs = require('fs');
const path = require('path');
const pathWay=path.join(__dirname,'text.txt');
console.log(pathWay);
const stream = new fs.ReadStream(pathWay,{encoding:'utf-8'});
 
stream.on('readable', function(){
  const data = stream.read();
  if(data != null){
    console.log(data);
  }  
});
 
stream.on('end', function(){  
});

stream.on('error', function(err){
  if(err.code == 'ENOENT'){
    console.log('Файл не найден');
  }else{
    console.error(err);
  }
});





