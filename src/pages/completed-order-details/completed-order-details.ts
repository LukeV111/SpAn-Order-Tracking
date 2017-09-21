import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseService } from './../../providers/firebase-service';
import { AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CompletedOrdersPage } from '../completed-orders/completed-orders';



@Component({
  selector: 'page-completed-order-details',
  templateUrl: 'completed-order-details.html',
})
export class CompletedOrderDetailsPage {

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompletedOrderDetailsPage');
  }

}
