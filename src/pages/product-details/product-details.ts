import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WooCommerce from 'woocommerce-api';
/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  product: any;
  wooCommerce: any;
  reviews: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get('product');
    console.log(this.product);

    this.wooCommerce = WooCommerce({
      url: 'http://18.220.213.63/',
      consumerKey: 'ck_f02b14b3b10ba414052703e80074ee0249aac21c',
      consumerSecret: 'cs_0bf2f3967567f15e70b59c6a161f65902b2985a6'
    });

    this.wooCommerce.getAsync('products/'+this.product.id+'/reviews').then((data)=>{
      this.reviews = JSON.parse(data.body).product_reviews;
      console.log(this.reviews);
    }, (err)=>{
      console.log(err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

}
