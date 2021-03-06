import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()

export class Servercon {    
  ServerURL:any;
  ServerURLi:any;
  fileURL: any;
  HeaderURL:any;
  homeitem:any;
  options:any;

  constructor(public http: Http) {
    this.HeaderURL = new Headers();
    this.HeaderURL.append('Content-Type', 'application/x-www-form-urlencoded');

    console.log('Hello Server Provider');
    
    this.ServerURL="http://betweenlifestyle.com/android/webservice/public-v4/"; 
    this.ServerURLi="http://betweenlifestyle.com/android/webservice/public-v3/"; 
    this.fileURL = "http://betweenlifestyle.com/android/upload/";
    this.options = new RequestOptions({
          headers: this.HeaderURL
    });
  }

deleteGallery(param: any, page: string){
  console.log('param', param);
  return new Promise(resolve => {
    
        this.http.post(this.ServerURL+page,param,this.options)
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          });
      }); 
}

updateContentImage(param: any, page: string){

  return new Promise(resolve => {
    
        this.http.post(this.ServerURL+page,param,this.options)
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          });
      }); 
}

updateMainCat(param: any, page: string){
  
  return new Promise(resolve => {
    
        this.http.post(this.ServerURL+page,param,this.options)
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          });
      }); 
}

updateContent(param: any, page: string){
  console.log('update param', param);
  console.log('update url', page);
  return new Promise(resolve => {
    
        this.http.post(this.ServerURL+page,param,this.options)
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          });
      }); 
}

banner(){
  return new Promise(resolve => {
   
      this.http.get(this.ServerURL+"getHomeTop10.php")
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    }); 
}

verification(param: any, page: string){
  return new Promise(resolve => {
    
        this.http.post(this.ServerURLi+page,param,this.options)
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          });
      }); 
}

uploadFile(param: any, page: string){
  return new Promise(resolve => {
    
        this.http.post(this.ServerURLi+page,param,this.options)
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          });
      }); 
}

insertContent(param: string, page: string){
  console.log('param', param);
// let yy = 'website_url=&weekend_business_hour=&category_id=16&phone_mobile=&weekday_business_hour=&phone_office=&name=JJ Hotel &image_path=http://betweenlifestyle.com/android/upload/no_photo.png&type=0&address=&desc=&latitude=3.0312371&longitude=101.61576'

 return new Promise(resolve => {
   
      this.http.post(this.ServerURL+page,param,this.options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    }); 
}

getMainCategory(){
  return new Promise(resolve => {

      this.http.get(this.ServerURL+"getMainCategoryData.php")
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    }); 
}

getDatalist(page:string)
{
  
  return new Promise(resolve => {
      this.http.get(this.ServerURL+page)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    }); 

}

  createCategory(param: string, page: string){
    console.log('parameter', param);
    console.log('url', this.ServerURL+page);

    return new Promise(resolve => {

          this.http.post(this.ServerURL+page,param,this.options)
            .map(res => res.json())
            .subscribe(data => {
              resolve(data);
            });
        }); 
  }

dataList(param: string, page: string){

 return new Promise(resolve => {

      this.http.post(this.ServerURL+page,param,this.options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    }); 
}

isContentExist(param: any, page:string){
  console.log('ppp', param);
  return new Promise(resolve => {
      this.http.post(this.ServerURL+page,param,this.options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    }); 
}

// updateContent(param: any, page:string){
//  return new Promise(resolve => {
//       this.http.post(this.ServerURL+page,param,this.options)
//         .map(res => res.json())
//         .subscribe(data => {
//           resolve(data);
//         });
//     }); 
// }

favodataList()
{
 

let list =this.dataIdenti();
let dataset=[]  
for (var i = 0; i <list.length; i++) {
dataset[i]=this.readData(list[i]);
    
}
  return JSON.parse( JSON.stringify(dataset));

}


dataIdenti()
{
if(this.dataIdentiCheck())  
{
let records:string;
records=this.readRecordIdentdity("record");
let ids =records.split(",");
return ids;
}
}

dataIdentiCheck()
{
let empty = this.readRecordIdentdity("record");
 if(empty==="")
 return false;
 else
 return true;

}




saveData(name:string,value:string)
{
localStorage.setItem(name,JSON.stringify(value));
}

readData(name:string)
{

 return JSON.parse(localStorage.getItem(name)); 

}

readRecordIdentdity(name:string)
{
   return JSON.parse(localStorage.getItem(name)); 
}

addRecordIdentdity(name:string,value:string)
{
   localStorage.setItem(name,JSON.stringify(value));
}



deleteData(name:string)
{
localStorage.removeItem(name);

}

saveDataset(name:string,value:any)
{
 
   localStorage.setItem(name,JSON.stringify(value));
}




}
