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

  getOrderStatuses(uid) {
    
      return this.afd.list('/users/' + uid + '/OrderStatuses/');
  }

//Adding item:

  addItem(uid, name) {
    
      this.afd.list('/users/' + uid + '/CurrentOrders/').push(name);
  }

  completedItem(uid, name) {
    
      this.afd.list('/users/' + uid + '/CompletedOrders/').push(name);
  } //Moves item to the databse of completed items.

  removeItem(uid, id) {
    
      this.afd.list('/users/' + uid + '/CurrentOrders/').remove(id);
  }

  removeCompletedItem(uid, name) {
    
      this.afd.list('/users/' + uid + '/CompletedOrders/').remove(name);
  }

  addOrderStatus(uid, name) {
    
      this.afd.list('/users/' + uid + '/OrderStatuses/').push(name);
  }

  removeOrderStatus(uid, id) {
    
      this.afd.list('/users/' + uid + '/OrderStatuses/').remove(id);
  }

}
