import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  newUser : any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.newUser.billing_address = {};
    this.newUser.shipping_address = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
