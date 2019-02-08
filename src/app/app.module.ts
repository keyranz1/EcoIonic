import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MenuPage} from '../pages/menu/menu';
import {ProductCategoryPage} from '../pages/product-category/product-category';
import {ProductDetailsPage} from '../pages/product-details/product-details';

import {IonicStorageModule} from '@ionic/storage';
import {CartPage} from '../pages/cart/cart';
import {SignupPage} from '../pages/signup/signup';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    ProductCategoryPage,
    ProductDetailsPage,
    CartPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    ProductCategoryPage,
    ProductDetailsPage,
    CartPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
