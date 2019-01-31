import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import * as WooCommerce from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  wooCommerce: any;
  products = [];

  @ViewChild('itemSlides') itemSlides: Slides;

  constructor(public navCtrl: NavController) {
    this.wooCommerce = WooCommerce({
      url: "http://localhost:8888/myServer/",
      consumerKey: "ck_b85fb8ebe54ccec41de71055905281025fc12f11",
      consumerSecret: "cs_8e02bf6198df63c05143d725e791aeb120808ace"
    });

    this.wooCommerce.getAsync("products").then((data) => {
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
      this.itemSlides.slideNext()
    },3500)
  }
}
