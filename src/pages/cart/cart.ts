import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage} from '@ionic/storage';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartItems : any[] = [];
  totalPrice: any;
  showEmptyCartMessage : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

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

}
