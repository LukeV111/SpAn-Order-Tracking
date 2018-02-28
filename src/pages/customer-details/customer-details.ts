
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseService } from './../../providers/firebase-service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditCustomerPage } from '../edit-customer/edit-customer';
import firebase from 'firebase';

@Component({
	selector: 'page-customer-details',
	templateUrl: 'customer-details.html',
})
export class CustomerDetailsPage {

	public customer: FirebaseListObservable<any[]>;
	public authUser: any;
	public customerArray; any = [];
	public profileForm: FormGroup;
	public profile: firebase.database.Reference;
	public customerRef: firebase.database.Reference;
	
	constructor(private db: AngularFireDatabase, public fb: FormBuilder, public navCtrl: NavController, private toastCtrl: ToastController, public alertCtrl: AlertController, public firebaseService: FirebaseService, public navParams: NavParams, private auth: AuthServiceProvider) {

		this.authUser = this.auth.getLoggedInUser();
		if (this.authUser) {
			this.navParams.get('customerRef')
			console.log(this.navParams.get('this.customerRef'))
			this.customer = this.navParams.data; //This line is referened by the html. 
			//console.log(this.navParams.data)
			//console.log(this.customer)
			this.customerRef = firebase.database().ref('/users/' + this.authUser.uid + '/Customers/');//This line is also referened by the html.
			this.db.list('/users/' + this.authUser.uid + '/Customers/').subscribe(items => {}); //This doesn't seem to do anything.
		};

		this.profileForm = fb.group({
			'companyName': [''],
			'customerName': [''],
			'accountsManager': [''],
			'accountsEmail': [''],
			'customerEmail': [''],
			'customerCode': [''],
			'customerTracking': [''],
			'grindType': [''],
			'location': [''],
			'paymentTerms': [''],
			'notes': [''],
		});
	}

	saveTracking(customerRef) {
		const updateTracking = this.db.list('/users/' + this.authUser.uid + '/Customers/');
		updateTracking.update(customerRef.$key, customerRef).then(() => {
			console.log("Saved");
		});
	}

	presentToast(position: string, message: string) {
		let toast = this.toastCtrl.create({
			message: message,
			position: position,
			duration: 3000
		});
		toast.present();
	} 4

	updateProfile(customerRef) {
		this.customerRef.update(this.profileForm.value).then(() => {
			this.presentToast('middle', 'Customer Profile is updated');
		});
	}


}
