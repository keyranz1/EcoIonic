import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import * as WooCommerce from 'woocommerce-api';
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
      url: 'http://localhost:8888/myServer/',
      consumerKey: 'ck_b85fb8ebe54ccec41de71055905281025fc12f11',
      consumerSecret: 'cs_8e02bf6198df63c05143d725e791aeb120808ace'
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
        // this.toastCtrl.create({
        //   message: 'No more new products!',
        //   duration:1500
        // }).present();
      }
    }, (err) => {
      console.log(err);
    });
  }

}
