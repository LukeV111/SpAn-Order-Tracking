import { Component } from '@angular/core';
import { NavController, NavParams, reorderArray } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseService } from './../../providers/firebase-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@Component({
  selector: 'page-order-statuses',
  templateUrl: 'order-statuses.html',
})

export class OrderStatusesPage {

  public orderStatuses: any[] = [];
  public orderStatus:any[] = [];
  public authUser: any;

  constructor(private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService, private auth: AuthServiceProvider) {

    this.authUser = this.auth.getLoggedInUser();
    if (this.authUser) {
      this.db.list('/users/' + this.authUser.uid + '/OrderStatuses/').subscribe(items => {
        this.orderStatuses = items;
        console.log("Before =>", this.orderStatuses);
      });
    }	
	}

addOrderStatus() {
  this.firebaseService.addOrderStatus(this.authUser.uid, this.orderStatus);
  this.orderStatus = [];
}

removeOrderStatus(orderStatus) {
  this.firebaseService.removeOrderStatus(this.authUser.uid, orderStatus);
}

reorderItems(name){
  this.orderStatuses = reorderArray(this.orderStatuses, name);

  //Saving to the database by overriding the orderStatuses that where there before. This is whay used set() instead of update().
  const updateOrderStatuses = this.db.list('/users/' + this.authUser.uid);
  updateOrderStatuses.set('/OrderStatuses/', this.orderStatuses).then(() =>{
    console.log("Done updating");
  }); //updateOrderStatuses.update(regUser.uid, userInfo)
}

}