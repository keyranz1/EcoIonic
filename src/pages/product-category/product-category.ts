import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import * as WooCommerce from 'woocommerce-api';
import {ProductDetailsPage} from '../product-details/product-details';

/**
 * Generated class for the ProductCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-product-category',
  templateUrl: 'product-category.html',
})
export class ProductCategoryPage {

  wooCommerce: any;
  products: any[];
  page: number;
  category: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
    this.page = 1;
    this.category = this.navParams.get("category");
    this.wooCommerce = WooCommerce({
      url: 'http://18.220.213.63/',
      consumerKey: 'ck_f02b14b3b10ba414052703e80074ee0249aac21c',
      consumerSecret: 'cs_0bf2f3967567f15e70b59c6a161f65902b2985a6'
    });

    this.wooCommerce.getAsync("products?filter[category]="+this.category.slug).then((data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err);
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductCategoryPage');
  }

  loadMoreProducts(event){
      this.page ++;
      console.log("getting page: " + this.page);

    this.wooCommerce.getAsync('products?filter[category]='+this.category.slug+"&page="+this.page).then((data) => {
      let temp = JSON.parse(data.body).products;
      this.products = this.products.concat(JSON.parse(data.body).products);
        event.complete();


      if(temp.length < 10){
        event.enable(false);
      }
    }, (err) => {
      console.log(err);
    });
  }

  openProductPage(product){
    this.navCtrl.push(ProductDetailsPage,{"product": product});
  }

}
