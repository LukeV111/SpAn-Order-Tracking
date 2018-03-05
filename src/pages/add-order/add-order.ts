import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseService } from './../../providers/firebase-service';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { Control } from "angular2/common";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase';

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
  public customers: any[] = [];
  public addOrderForm: FormGroup;
  public customer: FirebaseListObservable<any[]>;
  public customerRef: firebase.database.Reference;

  constructor(private db: AngularFireDatabase, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    public firebaseService: FirebaseService, 
    private auth: AuthServiceProvider,
    public fb: FormBuilder,) {

    this.authUser = this.auth.getLoggedInUser();
    if (this.authUser) {
      this.order = this.navParams.data;
      this.db.list('/users/' + this.authUser.uid + '/OrderStatuses/').subscribe(items => {
        this.orderStatuses = items;
      })
      this.customer = this.navParams.data; //This line is referened by the html.
      this.customerRef = firebase.database().ref('/users/' + this.authUser.uid + '/Customers/');//This line is also referened by the html.
      this.db.list('/users/' + this.authUser.uid + '/Customers/').subscribe(items => {
        this.customers = items;
      });

        this.addOrderForm = fb.group({
        'companyName': [''],
        'orderNumber': [''],
        'orderItems': [''],
        'myDate': [''],
        'customerEmail': [''],
          'orderStatus': ['Set Status'],
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

  // addItem() {
  //   this.firebaseService.addItem(this.authUser.uid,this.order);
  // this.authUser.uid,this.order = [''];
  // }

  addItem() {
    //console.log("Update Customer", this.profileForm.value);
    this.firebaseService.addItem(this.authUser.uid, this.addOrderForm.value)
      this.navCtrl.setRoot(HomePage)
};

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

}
