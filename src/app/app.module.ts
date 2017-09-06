import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AddOrderPage } from '../pages/add-order/add-order';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SettingsPage } from '../pages/settings/settings';
import { CompletedOrdersPage } from '../pages/completed-orders/completed-orders';
import { OrderStatusesPage } from '../pages/order-statuses/order-statuses';
import { OrderDetailsPage } from '../pages/order-details/order-details';
import { LeadsPage } from '../pages/leads/leads';
//import { CompletedOrderDetailsPage } from '../pages/completed-order-details/completed-order-details';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseService } from './../providers/firebase-service';
import { AngularFireAuthModule } from "angularfire2/auth";
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

const firebaseConfig = {
  apiKey: "AIzaSyC7htrI1a0PAxNAD9vr61VW7WHd2q9u0c4",
  authDomain: "span-order-tracking-app.firebaseapp.com",
  databaseURL: "https://span-order-tracking-app.firebaseio.com",
  projectId: "span-order-tracking-app",
  storageBucket: "span-order-tracking-app.appspot.com",
  messagingSenderId: "600260179957"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddOrderPage,
    TabsPage,
    SettingsPage,
    LoginPage,
    RegisterPage,
    CompletedOrdersPage,
    OrderDetailsPage,
    OrderStatusesPage,
    LeadsPage,
    //CompletedOrderDetailsPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    AddOrderPage,
    SettingsPage,
    LoginPage,
    RegisterPage,
    HomePage,
    CompletedOrdersPage,
    OrderDetailsPage,
    OrderStatusesPage,
    LeadsPage,
    //CompletedOrderDetailsPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider
  ]
})
export class AppModule { }
