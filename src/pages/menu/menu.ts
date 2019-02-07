import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage} from '../home/home';
import * as WooCommerce from 'woocommerce-api';
import {ProductCategoryPage} from '../product-category/product-category';
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
  @ViewChild('content') childNavCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage;
    this.categories = [];
    this.wooCommerce = WooCommerce({
      url: 'http://18.220.213.63/',
      consumerKey: 'ck_f02b14b3b10ba414052703e80074ee0249aac21c',
      consumerSecret: 'cs_0bf2f3967567f15e70b59c6a161f65902b2985a6'
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

  openCategoryPage(category){
    console.log(category);
    this.childNavCtrl.setRoot(ProductCategoryPage,{'category': category});
  }

}
