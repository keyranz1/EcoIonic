import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage} from '../home/home';
import * as WooCommerce from 'woocommerce-api';
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  homePage: any;
  wooCommerce: any;
  categories: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage;
    this.categories = [];
    this.wooCommerce = WooCommerce({
      url: 'http://localhost:8888/myServer/',
      consumerKey: 'ck_b85fb8ebe54ccec41de71055905281025fc12f11',
      consumerSecret: 'cs_8e02bf6198df63c05143d725e791aeb120808ace'
    });

    this.wooCommerce.getAsync("products/categories").then((data)=>{
      console.log(JSON.parse(data.body).product_categories);
      let temp: any[] = JSON.parse(data.body).product_categories;

      for(let i = 1; i< temp.length; i++ ){
        if(temp[i].parent == 0) {

          if(temp[i].slug =='clothing'){
            temp[i].icon = 'shirt';
          }
          if(temp[i].slug =='decor'){
            temp[i].icon = 'brush';
          }

          if(temp[i].slug =='music'){
            temp[i].icon = 'musical-note';
          }

          this.categories.push(temp[i]);
        }
      }
    },(err)=>{
      console.log(err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
