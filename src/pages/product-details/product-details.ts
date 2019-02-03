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
      url: 'http://localhost:8888/myServer/',
      consumerKey: 'ck_b85fb8ebe54ccec41de71055905281025fc12f11',
      consumerSecret: 'cs_8e02bf6198df63c05143d725e791aeb120808ace'
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
