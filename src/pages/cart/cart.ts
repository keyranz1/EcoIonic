import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import { Storage} from '@ionic/storage';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartItems : any[] = [];
  totalPrice: any;
  showEmptyCartMessage : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage: Storage, private viewCtrl: ViewController) {

    this.totalPrice = 0.0;
    this.storage.ready().then(()=>{
      this.storage.get("cart").then((data)=>{
        this.cartItems = data;
        console.log(this.cartItems);

        if(this.cartItems.length > 0){
          this.cartItems.forEach((item,index)=>{
            this.totalPrice += (item.product.price * item.quantity);
          });
        } else {
          this.showEmptyCartMessage = true;
        }

      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  removeFromCart(item,i){
    let price = item.price;
    let qty = item.quantity;

    this.cartItems.splice(i,1);
    this.storage.set("cart",this.cartItems).then(()=>{
      this.totalPrice = this.totalPrice - (price * qty);
    });

    if(this.cartItems.length == 0){
      this.showEmptyCartMessage = true;
    }
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
