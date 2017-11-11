import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseService } from './../../providers/firebase-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Component } from '@angular/core';


@Injectable()
export class DataProvider {

  customers: any;
  
  constructor(
    private db: AngularFireDatabase,
    public http: Http,
    public firebaseService: FirebaseService,
    private auth: AuthServiceProvider,
    public authUser: any,) {
    // Insert list here.

   /* this.db.list('/users/' + this.authUser.uid + '/Customers/').subscribe(items => {
      this.customers = items;
    });
*/

  }

  filterItems(searchTerm) {

    return this.customers.filter((customers) => {
      return customers.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

}
