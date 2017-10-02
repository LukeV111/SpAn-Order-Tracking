import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseService } from './../../providers/firebase-service';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { Control } from "angular2/common";

@Component({
  selector: 'page-add-order',
  templateUrl: 'add-order.html',
})
export class AddOrderPage {

  //orderItems: FirebaseListObservable<any[]>;

  public myDate: String = new Date().toISOString();
  public order: any[];
  public orderStatuses: any[] = [];
  public authUser: any;

  constructor(private db: AngularFireDatabase, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    public firebaseService: FirebaseService, 
    private auth: AuthServiceProvider) {

    this.authUser = this.auth.getLoggedInUser();
    if (this.authUser) {
      this.order = this.navParams.data;
      this.db.list('/users/' + this.authUser.uid + '/OrderStatuses/').subscribe(items => {
        this.orderStatuses = items;
      });
    }

 //   this.orderItems = this.firebaseService.getCurrentOrders();

 //   this.order = [];

  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Order Created!',
      buttons: ['OK']
    });
    alert.present();
  }

  addItem() {
    this.firebaseService.addItem(this.authUser.uid,this.order);
  this.authUser.uid,this.order = [''];
  }

  completedItem() {
    this.firebaseService.completedItem(this.authUser.uid,this.order);
  }

  saveStatus(order) {
    const updateOrder = this.db.list('/users/' + this.authUser.uid + '/CurrentOrders/');
    updateOrder.update(order.$key, order).then(() =>{
      console.log("Saved");
    });
  }

  toHome() {
    this.navCtrl.push(HomePage)
  }

  clearText() {
    this.authUser.uid,this.order = [];
    console.log("Trying to clear text");
  }

}
