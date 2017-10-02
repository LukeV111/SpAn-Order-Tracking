import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseService } from './../../providers/firebase-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CompletedOrderDetailsPage } from '../completed-order-details/completed-order-details';

@Component({
  selector: 'page-archive',
  templateUrl: 'archive.html',
})
export class ArchivePage {

  orders: FirebaseListObservable<any[]>;
  public authUser: any;

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService, private auth: AuthServiceProvider) {

    this.authUser = this.auth.getLoggedInUser();
    if (this.authUser) {
      this.orders = this.firebaseService.getArchivedOrders(this.authUser.uid);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArchivePage');
  }

  removeArchivedItem(id) {
    this.firebaseService.removeArchivedItem(this.authUser.uid, id);
  }

// Trying to add the navCTRL to completed orders.


  ArchivedItemPutBack(order) {
    this.firebaseService.ArchivedItemPutBack(this.authUser.uid, order);
  }


}