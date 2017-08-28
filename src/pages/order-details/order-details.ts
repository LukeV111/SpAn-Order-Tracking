import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseService } from './../../providers/firebase-service';
import { AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})

export class OrderDetailsPage {

	public order: any;
	public orderStatuses: any[] = [];
	public authUser: any;

	constructor(private db: AngularFireDatabase, public navCtrl: NavController, public alertCtrl: AlertController, public firebaseService: FirebaseService, public navParams: NavParams, private auth: AuthServiceProvider) {

		this.authUser = this.auth.getLoggedInUser();
		if (this.authUser) {
			this.order = this.navParams.data;
			this.db.list('/users/' + this.authUser.uid + '/OrderStatuses/').subscribe(items => {
			  this.orderStatuses = items;
			});
		}
	}

	saveStatus(order) {
	  const updateOrder = this.db.list('/users/' + this.authUser.uid + '/CurrentOrders/');
	  updateOrder.update(order.$key, order).then(() =>{
	    console.log("Saved");
	  });
	}
 


   showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Order Status Updated!',
      buttons: ['OK']
    });
    alert.present();
  }

  doneEditing(){ 
    this.navCtrl.push(HomePage);
  }

}