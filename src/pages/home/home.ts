import { FirebaseService } from './../../providers/firebase-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { OrderDetailsPage } from '../order-details/order-details';
import { LeadsPage } from '../leads/leads';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  orders: FirebaseListObservable<any[]>;
  public authUser: any;

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService, private auth: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CompletedOrdersPage');
    this.authUser = this.auth.getLoggedInUser();
    if (this.authUser) {
      this.orders = this.firebaseService.getCurrentOrders(this.authUser.uid);
    }
  }
 
  removeItem(order) {
    this.firebaseService.removeItem(this.authUser.uid, order);
  }

  completedItem(order) {
    this.firebaseService.completedItem(this.authUser.uid, order);
  }

  viewItem(order){ 
    this.navCtrl.push(OrderDetailsPage, order);
  }

  viewLeads(){ 
    this.navCtrl.push(LeadsPage);
    console.log("leads page")
  }

    getDate(datepar){

     var dateParts = datepar.split("-");
     var date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
     return date;
  }


}
