const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const pathForFiles = path.join(__dirname,'files');
const pathForCopy=path.join(__dirname,'files-copy');
//const streamRead = new fs.ReadStream(pathForFiles,{encoding:'utf-8'});
fsPromises.mkdir(`${pathForCopy}`,{recursive:true}).then(function() {
  console.log('Directory created successfully');
  fs.readdir(pathForCopy,{withFileTypes: true}, (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        let pathFileDel=path.join(__dirname,'files-copy',file.name);
        fs.unlink(pathFileDel, () => {
          
        });
        
      });
    }
    fs.readdir(pathForFiles,{withFileTypes: true}, (err, files) => {
      if (err)
        console.log(err);
      else {        
        files.forEach(file => {
          
          if (!file.isDirectory()){        
            let pathFile=path.join(__dirname,'files',file.name);
            let pathFileCopy=path.join(__dirname,'files-copy',file.name);  
            const streamRead = new fs.ReadStream(pathFile,{encoding:'utf-8'});   
            const streamWrite = new fs.createWriteStream(pathFileCopy,{encoding:'utf-8'});
            streamRead.on('readable', function(){
              const data = streamRead.read();
              if(data != null){            
                streamWrite.write(`${data}\n`);
              }  
            });
             
            streamRead.on('end', function(){  
            });
            
            streamRead.on('error', function(err){
              if(err.code == 'ENOENT'){
                console.log('Файл не найден');
              }else{
                console.error(err);
              }
            });                  
          }              
        });    
      }
    });  
  });
}).catch(function() {
  console.log('failed to create directory');
});



