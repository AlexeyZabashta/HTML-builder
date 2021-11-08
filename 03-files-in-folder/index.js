const fs = require('fs');
const path = require('path');
const pathSecret=path.join(__dirname,'secret-folder');

fs.readdir(pathSecret,{withFileTypes: true}, (err, files) => {
  if (err)
    console.log(err);
  else {
    console.log('\nCurrent directory files:');
    files.forEach(file => {
      
      if (!file.isDirectory()){
        let pathSecFile=path.join(__dirname,'secret-folder',file.name);        
        let fileExt=path.extname(file.name);
        let fileName=(file.name).split(fileExt).join('');
        let fileExtConsole=fileExt.substr(1);        
        fs.stat(pathSecFile,(err,file)=>{
          if (err){
            console.log(err);
          }else{            
            let fileSize= file.size;
            console.log(`${fileName} - ${fileExtConsole} - ${+(fileSize/1024).toFixed(3)} kb`); 
          }         
        });            
      }              
    });    
  }
});



