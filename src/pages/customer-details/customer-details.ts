import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseService } from './../../providers/firebase-service';
import { FirebaseListObservable } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';



@Component({
  selector: 'page-customer-details',
  templateUrl: 'customer-details.html',
})
export class CustomerDetailsPage {

	//customer: FirebaseListObservable<any[]>;
	public customer: any;
	public authUser: any;

   	constructor(private db: AngularFireDatabase, public navCtrl: NavController, public alertCtrl: AlertController, public firebaseService: FirebaseService, public navParams: NavParams, private auth: AuthServiceProvider) {

				this.authUser = this.auth.getLoggedInUser();
			  if (this.authUser) {
				  this.customer = this.navParams.data;
				  this.db.list('/users/' + this.authUser.uid + '/Customers/').subscribe(items => {
				  });
			  };
	}

	saveTracking(customer) {
		const updateTracking = this.db.list('/users/' + this.authUser.uid + '/Customers/');
		updateTracking.update(customer.$key, customer).then(() => {
			console.log("Saved");
		});
}

}