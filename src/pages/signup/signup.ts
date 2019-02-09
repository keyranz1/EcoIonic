import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import * as WooCommerce from 'woocommerce-api';
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
  billing_shipping_same: boolean ;
  wooCommerce: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toastCtrl: ToastController, private alertCtrl: AlertController) {
    this.newUser.billing_address = {};
    this.newUser.shipping_address = {};
    this.billing_shipping_same = false;

    this.wooCommerce = WooCommerce({
      url: 'http://18.220.213.63/',
      consumerKey: 'ck_f02b14b3b10ba414052703e80074ee0249aac21c',
      consumerSecret: 'cs_0bf2f3967567f15e70b59c6a161f65902b2985a6'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  setBillingToShipping(){
    this.billing_shipping_same = !this.billing_shipping_same;
  }

  checkEmail(){
    let validEmail = false;
    let reg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

    if(reg.test(this.newUser.email)){
      this.wooCommerce.getAsync("customers/email/"+this.newUser.email).then((data)=>{
        let res = JSON.parse(data.body);

        if(res.errors){
          validEmail = true;
          this.toastCtrl.create({
            message: "Email looks good",
            duration: 2500,
            position: 'top',
            cssClass: 'success'
          }).present();
        } else {
          validEmail = false;
          this.toastCtrl.create({
            message: "Email already registered. Choose new email or try signing in.",
            showCloseButton: true,
            position: 'top',
            cssClass: 'warning'
          }).present();
        }
      })
    } else {
      validEmail = false;
      this.toastCtrl.create({
        message: "Invalid Email",
        showCloseButton: true,
        dismissOnPageChange: true,
        cssClass: 'fail'
      }).present();
    }
  }

  signUp(){
    let customerData = {
      customer: {}
    }

    customerData.customer = {
      "email": this.newUser.email,
      "first_name": this.newUser.first_name,
      "last_name": this.newUser.last_name,
      "username": this.newUser.username,
      "password": this.newUser.password,
      "billing_address": {
        "email": this.newUser.email,
        "first_name": this.newUser.first_name,
        "last_name": this.newUser.last_name,
        "comapany": "",
        "address_1": this.newUser.billing_address.address_1,
        "address_2": this.newUser.billing_address.address_2,
        "city": this.newUser.billing_address.city,
        "country": this.newUser.billing_address.country,
        "state": this.newUser.billing_address.state,
        "postcode": this.newUser.billing_address.postcode,
      },
      "shipping_address":{
        "first_name": this.newUser.first_name,
        "last_name": this.newUser.last_name,
        "comapany": "",
        "address_1": this.newUser.shipping_address.address_1,
        "address_2": this.newUser.shipping_address.address_2,
        "city": this.newUser.shipping_address.city,
        "country": this.newUser.shipping_address.country,
        "state": this.newUser.shipping_address.state,
        "postcode": this.newUser.shipping_address.postcode,
      }

    }

    if(this.billing_shipping_same){
      this.newUser.shipping_address = this.newUser.billing_address;
    }

    this.wooCommerce.postAsync("customers",customerData).then((data)=>{
        let res = JSON.parse(data.body);

        if(res.customer){
          this.alertCtrl.create({
            title: "Account Created",
            message: "Your account created succesfully! please login to proceed.",
            buttons: [{
              text: "Login",
              handler: () => {
                //todo later on
              }
            }],
          }).present();
        } else if (res.errors){
          this.toastCtrl.create({
            message: res.errors[0].message,
            showCloseButton: true
          }).present();
        }
    });

  }

}
