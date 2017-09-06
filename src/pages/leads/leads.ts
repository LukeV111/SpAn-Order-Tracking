import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseService } from './../../providers/firebase-service';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-leads',
  templateUrl: 'leads.html',
})
export class LeadsPage {

  public lead: any[];
  public leadItems: any[] = [];
  public authUser: any;

  constructor(private db: AngularFireDatabase, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    public firebaseService: FirebaseService, 
    private auth: AuthServiceProvider) {

    this.authUser = this.auth.getLoggedInUser();
    if (this.authUser) {
      this.lead = this.navParams.data;
      this.db.list('/users/' + this.authUser.uid + '/Leads/').subscribe(items => {
        this.leadItems = items;
      });
    }

  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Lead Created!',
      buttons: ['OK']
    });
    alert.present();
  }

  addLead() {
    this.firebaseService.addLead(this.authUser.uid,this.lead);
    this.authUser.uid,this.lead = [];
  }

  //wonLead(lead) {
  //this.firebaseService.wonLead(this.authUser.uid, lead);
//}

  //completedLead() {
  //  this.firebaseService.completedItem(this.authUser.uid,this.order);
  //}

  //toHome() {
  //  this.navCtrl.push(HomePage)
  //}

  //clearText() {
  //    console.log('Reset!')
  //    this.order = []
  //  }

}
