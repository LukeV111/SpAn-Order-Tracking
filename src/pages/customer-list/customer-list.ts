import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseService } from './../../providers/firebase-service';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { Control } from "angular2/common";
import { CustomerDetailsPage } from '../customer-details/customer-details';
import { AddCustomerPage } from '../add-customer/add-customer';
import firebase from 'firebase';


@Component({
  selector: 'page-customer-list',
  templateUrl: 'customer-list.html',
})
export class CustomerListPage {

  public customerList: Array<any>;
  public loadedCustomerList: Array<any>;
  public customerRef: firebase.database.Reference;

  customer: any;
  customers: any;

  public authUser: any;

  constructor(private db: AngularFireDatabase, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    public firebaseService: FirebaseService, 
    private auth: AuthServiceProvider) {


    this.authUser = this.auth.getLoggedInUser();
    if (this.authUser) {
      this.customer = this.firebaseService.getCustomerList(this.authUser.uid);
      this.customerRef = firebase.database().ref('/users/' + this.authUser.uid + '/Customers/');
      console.log("this.authUser")
      //console.log(this.authUser.uid)
    }

    this.customerRef = firebase.database().ref('/users/' + this.authUser.uid + '/Customers/');

    this.customerRef.on('value', customerList => {
      let customers = [];
      customerList.forEach(customer => {
        customers.push(customer.val());
        return false;
      });
      this.customerList = customers;
      this.loadedCustomerList = customers;
    });
  }

  initializeItems(): void {
    this.customerList = this.loadedCustomerList;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.customerList = this.customerList.filter((v) => {
      if (v.companyName && q) {
        if (v.companyName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.customerList.length);

  }
  
  removeCustomer(id) {
    this.firebaseService.removeCustomer(this.authUser.uid, id);
  }

  viewCustomer(customerRef) {
    this.navCtrl.push(CustomerDetailsPage, customerRef);
  }

  goToAddCustomer() {
    this.navCtrl.push(AddCustomerPage);
    console.log("add customer page")
  }

  ionViewDidLoad() {

  }

  }
