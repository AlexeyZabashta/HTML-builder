const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const pathForTemp=path.join(__dirname,'template.html');
const pathForProject=path.join(__dirname,'project-dist');
const pathForStylesDir=path.join(__dirname,'styles');
const pathForIndex=path.join(__dirname,'project-dist','index.html');


const pathForComp=path.join(__dirname,'components');
let cashHTML={};
fs.readdir(pathForComp,{withFileTypes: true}, (err, files) =>{
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      let pathFile=path.join(pathForComp,file.name);
      let fileExt=path.extname(file.name);
      let fileName=(file.name).split(fileExt).join('');
      fs.readFile(pathFile, function(err,data){  
        if (err) throw err;
        cashHTML[fileName]=data.toString();               
      });        
    });
  }
});


function main(){

  fs.readFile(pathForTemp, function(err,data){
    if (err) throw err;
    let arr=data.toString();
    let array = arr.split('\n');
    let cashHTMLnames=Object.keys(cashHTML);    
    for (let i=0;i<array.length;i++){    
      let elem=array[i].trim(); 
      cashHTMLnames.forEach(item =>{
        if (elem.indexOf(item)!==-1){        
          array[i]=cashHTML[item];
        }
      });   
    }
    
    fsPromises.mkdir(pathForProject,{recursive:true}).then(function(){ 
      const streamWrite = new fs.createWriteStream(pathForIndex,{encoding:'utf-8'});
      streamWrite.write(array.join('\n'));
    });
    fs.readdir(pathForStylesDir,{withFileTypes: true}, (err, files) => {
      if (err)
        console.log(err);
      else {          
        let pathForBundle=path.join(__dirname,'project-dist','style.css'); 
        fs.writeFile(pathForBundle,'',(err)=>{
          if (err) throw err;          
        });    
        
        files.forEach(file => {
          let fileExt=path.extname(file.name);          
          if (!file.isDirectory()&&(fileExt==='.css')){                  
            let pathForStyles=path.join(__dirname,'styles',file.name);        
            const streamRead = new fs.ReadStream(pathForStyles); 
            streamRead.on('readable', function(){
              const data = streamRead.read();
              if(data != null){
                let dataStr=data.toString();
                let dataMass=dataStr.split('\n');
                for (let i=0;i<dataMass.length;i++){
                  let elemMass=dataMass[i];                  
                  if (elemMass.indexOf('utf8')!==-1){                    
                    dataMass[i]='';
                  }
                }
                let dataJoin=dataMass.join('\n');                         
                fs.appendFile(pathForBundle,`${dataJoin}`,(err)=>{
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
  });
  

  //Собираем Bundle из стилей


  const pathForAssets=path.join(__dirname,'assets');
  const pathForAssetsF=path.join(pathForAssets,'fonts');
  const pathForAssetsI=path.join(pathForAssets,'img');
  const pathForAssetsS=path.join(pathForAssets,'svg');
  const pathForAssetsCreate=path.join(__dirname,'project-dist','assets');
  const pathForAssetsCreateF=path.join(pathForAssetsCreate,'fonts');
  const pathForAssetsCreateI=path.join(pathForAssetsCreate,'img');
  const pathForAssetsCreateS=path.join(pathForAssetsCreate,'svg');


  /*fs.rmdir(pathForAssetsCreate, err => {
    if(err) throw err; // не удалось удалить папку
    console.log('Папка успешно удалена');
  });*/

  fsPromises.mkdir(pathForAssetsCreate,{recursive:true}).then(function(){  
  });
  fsPromises.mkdir(pathForAssetsCreateF,{recursive:true}).then(function(){
    fs.readdir(pathForAssetsCreateF,{withFileTypes: true}, (err, files) =>{
      if (err)
        console.log(err);
      else {
        files.forEach(file => {
          let pathFileDel=path.join(pathForAssetsCreateF,file.name);
          fs.unlink(pathFileDel, () => {          
          });        
        });
      }
    });
    fs.readdir(pathForAssetsF, {withFileTypes: true}, (err, files) =>{
      files.forEach(file => {
        let source=path.join(pathForAssetsF,file.name);
        let dst=path.join(pathForAssetsCreateF,file.name);
        fsPromises.copyFile(source, dst).then( function () {          
        });       
      });
    });

  });
  fsPromises.mkdir(pathForAssetsCreateI,{recursive:true}).then(function(){
    fs.readdir(pathForAssetsCreateI,{withFileTypes: true}, (err, files) =>{
      if (err)
        console.log(err);
      else {
        files.forEach(file => {
          let pathFileDel=path.join(pathForAssetsCreateI,file.name);
          fs.unlink(pathFileDel, () => {          
          });        
        });
      }
    });
    fs.readdir(pathForAssetsI, {withFileTypes: true}, (err, files) =>{
      files.forEach(file => {
        let source=path.join(pathForAssetsI,file.name);
        let dst=path.join(pathForAssetsCreateI,file.name);
        fsPromises.copyFile(source, dst).then( function () {          
        });       
      });
    });  
  });
  fsPromises.mkdir(pathForAssetsCreateS,{recursive:true}).then(function(){
    fs.readdir(pathForAssetsCreateS,{withFileTypes: true}, (err, files) =>{
      if (err)
        console.log(err);
      else {
        files.forEach(file => {
          let pathFileDel=path.join(pathForAssetsCreateS,file.name);
          fs.unlink(pathFileDel, () => {          
          });        
        });
      }
    });
    fs.readdir(pathForAssetsS, {withFileTypes: true}, (err, files) =>{
      files.forEach(file => {
        let source=path.join(pathForAssetsS,file.name);
        let dst=path.join(pathForAssetsCreateS,file.name);
        fsPromises.copyFile(source, dst).then( function () {          
        });       
      });
    });  
  });
}

setTimeout(main, 2000);

