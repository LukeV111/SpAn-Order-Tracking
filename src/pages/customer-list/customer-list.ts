import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseService } from './../../providers/firebase-service';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { Control } from "angular2/common";
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-customer-list',
  templateUrl: 'customer-list.html',
})
export class CustomerListPage {

  searchTerm: string = '';

  customers: FirebaseListObservable<any[]>;
  public authUser: any;

  constructor(private db: AngularFireDatabase, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    public DataProvider: DataProvider, 
    public firebaseService: FirebaseService, 
    private auth: AuthServiceProvider) {


    this.authUser = this.auth.getLoggedInUser();
    if (this.authUser) {
      this.customers = this.firebaseService.getCustomerList(this.authUser.uid);
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerListPage');
    this.setFilteredItems();
  }

  setFilteredItems() {

    this.customers = this.DataProvider.filterItems(this.searchTerm);

  }

}
