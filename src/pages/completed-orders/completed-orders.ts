import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseService } from './../../providers/firebase-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CompletedOrderDetailsPage } from '../completed-order-details/completed-order-details';

@Component({
  selector: 'page-completed-orders',
  templateUrl: 'completed-orders.html',
})
export class CompletedOrdersPage {

	orders: FirebaseListObservable<any[]>;
  public authUser: any;

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService, private auth: AuthServiceProvider) {

    this.authUser = this.auth.getLoggedInUser();
    if (this.authUser) {
      this.orders = this.firebaseService.getCompletedOrders(this.authUser.uid);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompletedOrdersPage');
  }

  removeCompletedItem(id) {
    this.firebaseService.removeCompletedItem(this.authUser.uid, id);
  }

  viewItem(order){ 
    this.navCtrl.push(CompletedOrderDetailsPage, order);
  }

  completedItemPutBack(order) {
    this.firebaseService.completedItemPutBack(this.authUser.uid, order);
  }

  archiveItem(order) {
    this.firebaseService.addArchive(this.authUser.uid, order);
  }

}
