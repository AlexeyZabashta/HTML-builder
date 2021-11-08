const fs = require('fs');
const path = require('path');
const pathForRead=path.join(__dirname,'styles');

fs.readdir(pathForRead,{withFileTypes: true}, (err, files) => {
  if (err)
    console.log(err);
  else {    
    let pathForBundle=path.join(__dirname,'project-dist','bundle.css'); 
    fs.writeFile(pathForBundle,'',(err)=>{
      if (err) throw err;      
    });

    files.forEach(file => {
      let fileExt=path.extname(file.name);      
      if (!file.isDirectory()&&(fileExt==='.css')){        
        let pathForStyles=path.join(__dirname,'styles',file.name);        
        const streamRead = new fs.ReadStream(pathForStyles,{encoding:'utf-8'});   
        
        streamRead.on('readable', function(){
          const data = streamRead.read();
          if(data != null){            
            fs.appendFile(pathForBundle,`${data}\n`,(err)=>{
              if(err) throw err;              
            });
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
