import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
// Do not import from 'firebase' as you'll lose the tree shaking benefits
import * as firebase from 'firebase/app';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
	private currentUser: firebase.User;

	constructor(public auth: AngularFireAuth) {
		this.auth.authState.subscribe((user: firebase.User) => this.currentUser = user);
	}

	signIn(email: any, password: any): firebase.Promise<any> {
		return this.auth.auth.signInWithEmailAndPassword(email, password);
	}

	signOut(): void {
		this.auth.auth.signOut();
	}

	register(email: any, password: any): firebase.Promise<any> {
		return this.auth.auth.createUserWithEmailAndPassword(email, password);
	}

	getLoggedInUser(): any {
		if (this.currentUser !== null) {
			return this.currentUser;
		}else{
			return '';
		}
	}

}
