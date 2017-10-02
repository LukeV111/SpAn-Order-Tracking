import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { App } from "ionic-angular";
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

	user = {} as User;

  constructor(private afAuth: AngularFireAuth,
    protected app: App,
  	public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,) {
  }

async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.setRoot(TabsPage);
      }

}
    catch (e) {
      console.error(e);
      this.showAlert();
    }
}

  register() {
  	this.navCtrl.push(RegisterPage)
  }

    showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Login Error',
      message: 'Your username or password is incorrect.',
      buttons: ['Try Again']
    });
    alert.present();
  
  }

}
