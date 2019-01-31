import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage} from '../home/home';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  homePage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
