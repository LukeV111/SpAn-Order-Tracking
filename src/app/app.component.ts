import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login'
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  public currentAuthUser: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: AngularFireAuth) {
    this.auth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.currentAuthUser = user;
        console.log("User is logged in via ===>> ", this.currentAuthUser.email)
        this.rootPage = TabsPage;
      }else{
        console.log("User is not logged in!!!");
        this.rootPage = LoginPage;          
      }
    });
  }
  
}

