import { Component } from '@angular/core';
import {ModalController, NavController, NavParams, ToastController,} from 'ionic-angular';
import * as WooCommerce from 'woocommerce-api';
import {Storage} from '@ionic/storage';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  product: any;
  wooCommerce: any;
  reviews: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage: Storage, private toastCtrl: ToastController,
              private modalCtrl: ModalController) {
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

  addToCart(product){
    this.storage.get("cart").then((data) =>{
        if(data == null || data.length < 0){
          data = [];
          data.push({
            "product": product,
            "quantity": 1,
            "amount": parseFloat(product.price)
          });
        } else {

          let added = 0;
          for(let i =0; i< data.length; i++){
            if(product.id == data[i].product.id){
              data[i].quantity += 1;
              data[i].amount = parseFloat(data[i].amount)+ parseFloat(data[i].product.price);
              added = 1;
            }
          }

          if(added == 0){
            data.push({
              "product": product,
              "quantity": 1,
              "amount": parseFloat(product.price)
            });
          }
        }

        this.storage.set("cart", data).then(()=>{
          console.log("Cart Updated");
          console.log(data);

          this.toastCtrl.create({
            message: "Cart Updated",
            duration: 2500
          }).present();
        })
    });
  }

  openCart(){
    this.modalCtrl.create(CartPage).present();
  }

}
