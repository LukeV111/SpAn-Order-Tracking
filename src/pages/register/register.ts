import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import 'rxjs/add/operator/take'
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

user: any = {};

  constructor(private auth: AuthServiceProvider, private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {}

  register(user: User) {
    let email = this.user.email;
    let pass = this.user.password;
    this.auth.register(email, pass)
      .then((regUser) => {
        console.log("Register succesfull ----> ", regUser);
        this.db.object('/defaultStatuses/').take(1).subscribe(items => {
          let statuses = items;
          console.log("statuses = ", statuses);
          let userInfo = {
            date : firebase.database.ServerValue.TIMESTAMP,
            userID : regUser.uid,
            email: this.user.email,
            OrderStatuses: statuses
          }; //user info
          const updateUser = this.db.list('/users');
          updateUser.update(regUser.uid, userInfo).then(() =>{
            this.auth.signIn(email, pass)
              .then(() => {
                console.log("Login succesfull");
                this.navCtrl.push(TabsPage);
            });
          });
        });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
