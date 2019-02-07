import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';

import * as WooCommerce from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  wooCommerce: any;
  products: any[];
  moreProducts: any[];
  page : number;

  @ViewChild('itemSlides') itemSlides: Slides;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {
    this.page = 2;

    this.wooCommerce = WooCommerce({
      url: 'http://18.220.213.63/',
      consumerKey: 'ck_f02b14b3b10ba414052703e80074ee0249aac21c',
      consumerSecret: 'cs_0bf2f3967567f15e70b59c6a161f65902b2985a6'
    });

    this.loadMoreProducts(null);

    this.wooCommerce.getAsync('products').then((data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidLoad(){
    setInterval(()=>{
      if(this.itemSlides.getActiveIndex() == this.itemSlides.length() -1) {
        this.itemSlides.slideTo(0);
      }
      this.itemSlides.slideNext();
    },3500);
  }

  loadMoreProducts(event){
    if(event == null){
      this.page = 1;
      this.moreProducts = [];
    } else {
      this.page ++;
    }

    this.wooCommerce.getAsync('products?page='+this.page).then((data) => {
      console.log(JSON.parse(data.body));
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);
      if(event != null){
        event.complete();
      }

      if(JSON.parse(data.body).products.length < 10){
        event.enable(false);
        this.toastCtrl.create({
          message: 'No more new products!',
          duration:1500
        }).present();
      }
    }, (err) => {
      console.log(err);
    });
  }
}
