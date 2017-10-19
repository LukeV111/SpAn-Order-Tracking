import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class FirebaseService {
  public authUser: any;

  constructor(public afd: AngularFireDatabase) {}

  getCurrentOrders(uid) {
    
      return this.afd.list('/users/' + uid + '/CurrentOrders/');
  }

  getSingleOrderInfo(uid) {
    
      return this.afd.list('/users/' + uid + '/CurrentOrders/');
  }

  getCompletedOrders(uid) {
    
      return this.afd.list('/users/' + uid + '/CompletedOrders/');
  }


  getArchivedOrders(uid) {
    
      return this.afd.list('/users/' + uid + '/Archive/');
  }

  getCustomerList(uid) {
    
      return this.afd.list('/users/' + uid + '/Customers/');
  }

  getOrderStatuses(uid) {
    
      return this.afd.list('/users/' + uid + '/OrderStatuses/');
  }

//Adding item:

  addItem(uid, name) {
      this.afd.list('/users/' + uid + '/CurrentOrders/').push(name);
  }    


addCustomer(uid, name) {
      this.afd.list('/users/' + uid + '/Customers/').push(name);
  }    


addArchive(uid, name) {
    
      this.afd.list('/users/' + uid + '/Archive/').push(name);
  }


  completedItem(uid, name) {
    
      this.afd.list('/users/' + uid + '/CompletedOrders/').push(name);
  } //Moves item to the databse of completed items.

  completedItemPutBack(uid, name) {
    
      this.afd.list('/users/' + uid + '/CurrentOrders/').push(name);
  } //Moves item back to the databse of current orders.

  ArchivedItemPutBack(uid, name) {
    
      this.afd.list('/users/' + uid + '/CurrentOrders/').push(name);
  } //Moves item back to the databse of current orders.

  removeItem(uid, id) {
    
      this.afd.list('/users/' + uid + '/CurrentOrders/').remove(id);
  }

  removeCompletedItem(uid, name) {
    
      this.afd.list('/users/' + uid + '/CompletedOrders/').remove(name);
  }

  removeArchivedItem(uid, name) {
    
      this.afd.list('/users/' + uid + '/Archive/').remove(name);
  }

  addOrderStatus(uid, name) {
    
      this.afd.list('/users/' + uid + '/OrderStatuses/').push(name);
  }

  removeOrderStatus(uid, id) {
    
      this.afd.list('/users/' + uid + '/OrderStatuses/').remove(id);
  }

}
