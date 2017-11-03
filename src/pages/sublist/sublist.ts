import { Component } from '@angular/core';
import {  ViewController, PopoverController, NavController, NavParams,LoadingController, Events, AlertController } from 'ionic-angular';
import{Servercon} from '../../providers/servercon'
import{DetailPage} from '../detail/detail'

@Component({
  template: `
     <ion-list color="light">
       <ion-item (click)="filterSub(0)">
       <img src="assets/foodicon.png" item-left width="27px" height="27px"/>
               食尚
      </ion-item>
      <ion-item (click)="filterSub(2)">
      <img src="assets/familyicon.png" item-left width="27px" height="27px"/>
      親子活动
      </ion-item>
      <ion-item (click)="filterSub(1)">
      <img src="assets/globe.png" item-left width="27px" height="27px"/>
              發現之旅
     </ion-item>
     </ion-list>
      `
})
export class FilterPage {

  constructor(public viewCtrl: ViewController, public popoverCtrl: PopoverController, public events: Events) {
  }

  filterSub(filtercode)
  {
    this.events.publish("filtercode", filtercode);
    this.viewCtrl.dismiss();
  }
}


@Component({
  selector: 'page-sublist',
  templateUrl: 'sublist.html'
})
export class SublistPage {
items:any=[];
start:any;
end:any;
total:any;
title:string;
backup_items:any=[];
showme:boolean;
limititem:any;
papa:any;
code:number = 0;
  constructor(public alertCtrl: AlertController, public events: Events, public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public ss:Servercon) {

    this.showme=false;
    this.start=10;
    this.end=10;
    this.total=0;

  }

  ionViewDidLoad() {

let param = "id="+this.navParams.get("id")+"&subid=0&start=0&end=10&type=0";
this.title=this.navParams.get("name");
console.log(this.navParams.data);
this.listitem(param);
this.subFilter();

  }

//   deleteItem(item)
//   {
//     const alert = this.alertCtrl.create({
//       title: 'Confirm delete?',
//       message: 'Do you really want to delete this item?',
//       buttons: [
//         {
//           text: 'Cancel',
//           role: 'cancel',
//           handler: () => {
//             console.log('Cancel clicked');
//           }
//         },
//         {
//           text: 'Delete',
//           handler: () => {
//             this.delContent(item);
//           }
//         }
//       ]
//     });
//     alert.present();
//   }
//
// delContent(item)
// {
//   console.log(item.content_id);
//   console.log(item.category_id);
//   let newparam = "content_id=" + item.content_id + "&category_id=" + item.category_id;
//   this.ss.dataList(newparam,"deleteContent.php")
//   .then((response)=>{
//     alert("Item successfully deleted!")
//     this.ionViewDidLoad();
//   })
//   .catch((Error)=>{
//     // alert("Insert Data Error");
//   })
// }

  subFilter()
  {
    this.events.subscribe("filtercode", (code) => {
      this.code = code;
      this.papa = "id="+this.navParams.get("id")+"&subid=0&start=0&end=10&type=" + code;
      this.filteritem(this.papa);
    })

    this.events.subscribe("deletion", (data) => {
      if(this.papa == undefined)
      {
        //means it does not filtered before, need to show full list with refresh
        let param = "id="+this.navParams.get("id")+"&subid=0&start=0&end=10&type=0";
        this.listitem(param);
      }
      else
      {
        //means its filtered before, need to show filtered result
        this.filteritem(this.papa);
      }
    })
  }

  presentPopover(myEvent) {
      let popover = this.popoverCtrl.create(FilterPage);
      popover.present({
        ev: myEvent

      });
  }

  filteritem(param)
  {


  let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  loading.present();
   this.ss.dataList(param,"getSubCategoryById_BK.php").then((response)=>{


  this.items =response;
  this.total= this.items.total;
  //this.start=this.items.start;
  //this.end=this.items.end;
  this.items=this.items.Data;
  console.log(this.items);
  this.backup_items=this.items;

  loading.dismiss();
    }).catch((Error)=>{
  console.log("Connection Error"+Error);
  loading.dismiss();
      });
  }

listitem(param)
{


let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
loading.present();
 this.ss.dataList(param,"getSubCategoryById.php").then((response)=>{


this.items =response;
this.total= this.items.total;
//this.start=this.items.start;
//this.end=this.items.end;
this.items=this.items.Data;
console.log(this.items);
this.backup_items=this.items;

loading.dismiss();
  }).catch((Error)=>{
console.log("Connection Error"+Error);
loading.dismiss();
    });
}


doInfinite(infiniteScroll)
{
  if(this.total>=this.start &&  this.showme==false)
  {

 let param = "id="+this.navParams.get("id")+"&subid=0&start="+this.start+"&end="+this.end;
 console.log("param limit"+param);
 this.ss.dataList(param,"getSubCategoryById.php").then((response)=>{
console.log("")
this.limititem =response;
this.total= this.limititem.total;
this.start=parseInt(this.limititem.start)+10;
this.limititem.Data.forEach(element => {
  this.items.push(element);
//this.backup_items.push(element);
});

this.limititem="";
 infiniteScroll.complete();

});
  }
  else
  {
 infiniteScroll.complete();

  }


}


listimage(imageurl:string)
{

let myStyles ={
  'background':'url('+imageurl+') no-repeat',
  'background-size':'100% 100%'
}

return myStyles;

}

openPage(item)
{


  this.navCtrl.push(DetailPage,item);
}


getItems(ev: any) {
    // Reset items back to all of the items
    this.items=[];

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items

    if (val && val.trim() != '' && val.length>2) {

let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
loading.present();
let id = this.navParams.get('id');
 let param = "search_string=" + val +  "&id=" + id + "&subid=0&start=0&end=25";
 // console.log(this)
 //console.log("param limit"+param);
 this.ss.dataList(param,"searchEngine.php").then((response)=>{
loading.dismiss();
this.limititem =response;
this.total= this.limititem.total;
//this.start=parseInt(this.limititem.start)+10;
this.limititem.Data.forEach(element => {
  this.items.push(element);
//this.backup_items.push(element);
});

this.limititem="";

});

/*
      this.items = this.items.filter((item) => {
        return (item.content_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
   })

   */

    }
else
{
  this.items=this.backup_items;

}
}


onCancel(onCancel)
{
this.items=this.backup_items;
this.showme=false;
}

seachshow()
{
if(this.showme==false)
 this.showme=true;
 else
 this.showme=false;

}


}
