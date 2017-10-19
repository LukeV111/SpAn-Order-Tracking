import { Component } from '@angular/core';
import { NavController, Nav, NavParams, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { OrderStatusesPage } from '../order-statuses/order-statuses';
import { ArchivePage } from '../archive/archive';
import { AddCustomerPage } from '../add-customer/add-customer';
import { CustomerListPage } from '../customer-list/customer-list';



@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private auth: AuthServiceProvider, public nav: Nav) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  updatestatuses() {
  	this.navCtrl.push(OrderStatusesPage)
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Email support@spanorders.com!',
      buttons: ['OK']
    });
    alert.present();
  }

  signOut() {
      this.auth.signOut();
      this.nav.setRoot(LoginPage);
      console.log("Sign Out");
  }

  viewArchive(){ 
    this.navCtrl.push(ArchivePage);
    console.log("archive page")
  }

  viewAddCustomer(){ 
    this.navCtrl.push(AddCustomerPage);
    console.log("add customer page")
  }

  viewCustomerList(){ 
    this.navCtrl.push(CustomerListPage);
    console.log("customer list page")
  }

}
