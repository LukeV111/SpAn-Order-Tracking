import { FirebaseService } from './../../providers/firebase-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { FirebaseListObservable } from 'angularfire2/database';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { OrderDetailsPage } from '../order-details/order-details';
//Imports to make the new code work
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take'
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public orders: any[] = [];
  public temp: any[] = [];
  public orderStatuses: any[] = [];
  public authUser: any;
  public customers: any[] = [];

  constructor(private db: AngularFireDatabase, public navCtrl: NavController, public alertCtrl: AlertController, public firebaseService: FirebaseService, private auth: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CompletedOrdersPage');
    this.authUser = this.auth.getLoggedInUser();
    if (this.authUser) {
      //*******************Getting orders using a method that updates the orders everytime there is a new order, Order will be rearranged if there is any change to the orders
      this.db.list('/users/' + this.authUser.uid + '/CurrentOrders/').subscribe(items => {
        console.log("CurrentOrders have been changed");
        this.orders = items;
        this.customers = items;
        this.temp = items;

        // If the orderStatuses are available rearrange orders. If not retrieve them from firebase
        if (this.orderStatuses.length > 0) {
          this.orders = []; //Emptying all orders so that array can be filled with matched orders from this.orderStatuses
          this.orderStatuses.forEach(orderStatus => {
            const val = (''+orderStatus.name).toLowerCase();
            const temp = this.temp.filter(function(d: any) {
              if ((''+d.OrderStatus).toLowerCase().indexOf(val) !== -1 || !val) {
                return true;
              }else{
                return false;
              }
            });
            this.orders = this.orders.concat(temp); //Adding all the rearranged orders
          });
          //Code above has arranged orders with a status, however orders without statuses will not show, so the below code will put them at the bottom.
          let noStatuses = [];
          this.temp.forEach(order => {
            if (order.OrderStatus) {
              //don't do anything
            }else{
              noStatuses.push(order);
            }
          });
          this.orders = this.orders.concat(noStatuses); //Adding all the orders without statuses
        }else{ //If the orderStatuses are not available retrieve them from firebase and then rearrange orders.
          //The below will only run once as I will only need it the first time the app is opened and there are no loaded orderStatuses. I used take(1) to make it only run once.
          this.db.list('/users/' + this.authUser.uid + '/OrderStatuses/').take(1).subscribe(items => {
            this.orderStatuses = items;
            this.orders = []; //Emptying all orders so that array can be filled with matched orders from this.orderStatuses
            this.orderStatuses.forEach(orderStatus => {
              const val = (''+orderStatus.name).toLowerCase();
              const temp = this.temp.filter(function(d: any) {
                if ((''+d.OrderStatus).toLowerCase().indexOf(val) !== -1 || !val) {
                  return true;
                }else{
                  return false;
                }
              });
              this.orders = this.orders.concat(temp); //Adding all the rearranged orders
            });
            //Code above has arranged orders with a status, however orders without statuses will not show, so the below code will put them at the bottom.
            let noStatuses = [];
            this.temp.forEach(order => {
              if (order.OrderStatus) {
                //don't do anything
              }else{
                noStatuses.push(order);
              }
            });
            this.orders = this.orders.concat(noStatuses); //Adding all the orders without statuses
          });
        }
        //*******************Getting OrderStatuses using a method that updates the OrderStatuses everytime there is a new OrderStatus, Orders will be rearranged if there is any change to the OrderStatuses
        this.db.list('/users/' + this.authUser.uid + '/OrderStatuses/').subscribe(items => {
          console.log("OrderStatuses have been changed");
          this.orderStatuses = items;
          this.orders = []; //Emptying all orders so that array can be filled with matched orders from this.orderStatuses
          this.orderStatuses.forEach(orderStatus => {
            const val = (''+orderStatus.name).toLowerCase();
            const temp = this.temp.filter(function(d: any) {
              if ((''+d.OrderStatus).toLowerCase().indexOf(val) !== -1 || !val) {
                return true;
              }else{
                return false;
              }
            });
            this.orders = this.orders.concat(temp); //Adding all the rearranged orders
          });
          //Code above has arranged orders with a status, however orders without statuses will not show, so the below code will put them at the bottom.
          let noStatuses = [];
          this.temp.forEach(order => {
            if (order.OrderStatus) {
              //don't do anything
            }else{
              noStatuses.push(order);
            }
          });
          this.orders = this.orders.concat(noStatuses); //Adding all the orders without statuses
        });

      });


      //Getting OrderStatuses using a method that updates the OrderStatuses everytime there is a new OrderStatus, Orders will be rearranged if there is any change to the OrderStatuses
      this.db.list('/users/' + this.authUser.uid + '/OrderStatuses/').subscribe(items => {
        this.orderStatuses = items;
      });

      // this.orders = this.firebaseService.getCurrentOrders(this.authUser.uid);
    }
  }
 
  removeItem(order) {
    this.firebaseService.removeItem(this.authUser.uid, order);
  }

  completedItem(order) {
    this.firebaseService.completedItem(this.authUser.uid, order);
  }
  

  viewItem(order){ 
    this.navCtrl.push(OrderDetailsPage, order);
  }

    getDate(datepar){

     var dateParts = datepar.split("-");
     var date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
     return date;
  }

  showAlertComplete() {
    let alert = this.alertCtrl.create({
      title: 'Good Job!',
      buttons: ['Thanks.']
    });
    alert.present();
  }

   showAlertDelete() {
    let alert = this.alertCtrl.create({
      title: 'Order Deleted!',
      buttons: ['OK']
    });
    alert.present();
  }

//Status updates below.

  saveStatus(order) {
    const updateOrder = this.db.list('/users/' + this.authUser.uid + '/CurrentOrders/');
    updateOrder.update(order.$key, order).then(() =>{
      console.log("Saved");
    });
  }

  // It's not going to work because you don't pull in the customer data into the home page when diplaying the orders. It's a copy, which won't work. It just takes the test from there.
  // Lets see if we can change that.
  // Maybe if orders automatically went under the customer and then just displayed on the home page in a certain way, that could be a winner.
  //But I don't know how to display unique data from multiple databases on the same page.
  

   showAlertStatus() {
    let alert = this.alertCtrl.create({
      title: 'Order Status Updated!',
      buttons: ['OK']
    });
    alert.present();
  }

}
