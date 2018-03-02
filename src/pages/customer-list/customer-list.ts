import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
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

  customer: FirebaseListObservable<any[]>;
  customer2: any;
  customers: any;

  public authUser: any;

  constructor(
    private db: AngularFireDatabase, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    public firebaseService: FirebaseService, 
    private auth: AuthServiceProvider) {

    this.authUser = this.auth.getLoggedInUser();
    if (this.authUser) {
      //this.customer2 = firebase.database().ref('/users/' + this.authUser.uid + '/Customers/');
      //this.navParams.get('customer2');
      //this.customer2.key = this.customer2.$key
      //console.log(this.customer2.key)
      //this.customer = this.firebaseService.getCustomerList(this.authUser.uid);
      this.customerRef = firebase.database().ref('/users/' + this.authUser.uid + '/Customers/');
      console.log("this.authUser")
      console.log(this.customer)
    }

    this.customerRef = firebase.database().ref('/users/' + this.authUser.uid + '/Customers/'); //CustomerRef is the reference for this Firebase Node!

    this.customerRef.on('value', customerList => {
      let customers = []; //Makes customers an empty list.
      customerList.forEach(customer => { 
        let item = customer.val();
        item.key = customer.key;
        customers.push(item);
        console.log(customer.key) //This logs each key!
        console.log(customerList)
        //this.navParams.get(customer.key)
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

  viewCustomer(customer) {
    this.navCtrl.push(CustomerDetailsPage, customer);
    console.log("ZZZZZZ", customer);
  }

  goToAddCustomer() {
    this.navCtrl.push(AddCustomerPage);
    console.log("add customer page")
  }

  ionViewDidLoad() {

  }

  }
