const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const pathForTemp=path.join(__dirname,'template.html');
const pathForProject=path.join(__dirname,'project-dist');
const pathForStylesDir=path.join(__dirname,'styles');
//const pathForCopyStyles=path.join(__dirname,'project-dist','style.css');
const pathForIndex=path.join(__dirname,'project-dist','index.html');
const pathForArt=path.join(__dirname,'components','articles.html');
const pathForFoot=path.join(__dirname,'components','footer.html');
const pathForHead=path.join(__dirname,'components','header.html');
//const streamRead = new fs.ReadStream(pathForTemp,{encoding:'utf-8'});

//помещаем содержимое header.html в переменную
let header;
fs.readFile(pathForHead, function(err,data){  
  if (err) throw err;
  header=data.toString();
  return header;
});

//помещаем содержимое articles.html в переменную
let articles;
fs.readFile(pathForArt, function(err,data){
  if (err) throw err;
  articles=data.toString();
  return articles;
});

//помещаем содержимое footer.html в переменную
let footer;
fs.readFile(pathForFoot, function(err,data){
  if (err) throw err;
  footer=data.toString();
  return footer;
});



//Функция для обработки и создания массива информации из html-файлов
fs.readFile(pathForTemp, function(err,data){
  if (err) throw err;
  let arr=data.toString();
  let array = arr.split('\n');
  for (let i=0;i<array.length;i++){
    let elem=array[i].trim();    
    if (elem==='{{about}}'){
      const pathForAbout=path.join(__dirname,'components','about.html');
      let about;
      fs.readFile(pathForAbout, function(err,data){
        if (err) throw err;
        about=data.toString();
        return about;
      });      
      array[i]=about;
    }
    if (elem==='{{header}}'){
      array[i]=header;
    }
    if (elem==='{{articles}}'){
      array[i]=articles;      
    }
    if (elem==='{{footer}}'){
      array[i]=footer;        
    }
  }
  //Создаем папку для помещения в нее index.html
  fsPromises.mkdir(pathForProject,{recursive:true}).then(function(){
    console.log('Directory created successfully');
    //создаем\перезаписываем файл index.html
    const streamWrite = new fs.createWriteStream(pathForIndex,{encoding:'utf-8'});
    streamWrite.write(array.join('\n'));
  });
  fs.readdir(pathForStylesDir,{withFileTypes: true}, (err, files) => {
    if (err)
      console.log(err);
    else {
      //помещаем Bundle в созданную ранее папку   
      let pathForBundle=path.join(__dirname,'project-dist','style.css');
      
      //создаем\перезаписываем файл style.css
      fs.writeFile(pathForBundle,'utf8',(err)=>{
        if (err) throw err;
        console.log('Bundle create');
      });
  
      //функция для сбора Bundle
      files.forEach(file => {
        let fileExt=path.extname(file.name);
        console.log(fileExt);
        if (!file.isDirectory()&&(fileExt==='.css')){  
          //считываение информации из каждого css-файла      
          let pathForStyles=path.join(__dirname,'styles',file.name);        
          const streamRead = new fs.ReadStream(pathForStyles,{encoding:'utf-8'});   
          
          streamRead.on('readable', function(){
            const data = streamRead.read();
            if(data != null){ 
              //добавление в bundle информации из каждого css-файла            
              fs.appendFile(pathForBundle,`${data}\n`,(err)=>{
                if(err) throw err;
                console.log('Data has been added!');
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
        console.log('File Copied');
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
        console.log('File Copied');
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
        console.log('File Copied');
      });       
    });
  });  
});
