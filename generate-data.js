// import * as faker from ;
const { faker } = require('@faker-js/faker');
const path = require('path');
const fs = require('fs');
// set locale to use vietnam 
// faker.locale = 'vi'
faker.setLocale('vi');


const randomDataBlog = (n)=>{
  const dataBlog = []
  if(n<=0) return dataBlog;
  for(let i=0;i< n;i++){
     dataBlog.push({
      "description": faker.lorem.paragraph(),
      "featuredImage": faker.image.avatar(),
      "publishDate": faker.date.past(),
      "published": Math.random() < 0.1,
      "title": faker.internet.userName(),
      "id": faker.datatype.uuid()
     })
  }
  return dataBlog;
}
//iife
(()=>{
  //random data 
  const data = randomDataBlog(10)

  //prepare db ob
  const db = {
    posts: data,
    blog:[],
    users:[],
  }
  
  // write db ob to db.json
  const filePath = path.join(__dirname + "./", "db.json");
  fs.writeFileSync(filePath,JSON.stringify(db,null,4),()=>{
    console.log('write data successfully 000')
  })
})()

