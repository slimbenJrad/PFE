import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  logs: any;
  profile: Observable<any>
  constructor(public fauth: AngularFireAuth, public route: Router, private afDatabase: AngularFireDatabase) {
    this.fauth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }
  async login(mail: string, pwd: string) {
    this.logs = await this.fauth.auth.signInWithEmailAndPassword(mail, pwd);
    if (this.logs) {
      //charger l'objet du user profile  courant
      this.fauth.authState.subscribe(data => {
        if (data) {
          this.afDatabase.object(`user/${data.uid}`).valueChanges().subscribe(log => {
            console.log(log);
            //insert dans localstorage profile
            localStorage.setItem('profil', JSON.stringify(log))
          }

          )
        }

      })

    }
    return;

  }
  async register(firstName, lastName, num_Tel, type_user, code, email, password) {
    try {
      await this.fauth.auth.createUserWithEmailAndPassword(email, password);
      // console.log('succes',result)
      this.fauth.authState.subscribe(auth => {
        console.log(auth.uid);
        this.afDatabase.object(`user/${auth.uid}`).set({
          firstName: firstName,
          lastName: lastName,
          num_Tel: num_Tel,
          code: code,
          role: type_user,
          email: email
        }).then(() => console.log("insrt lok"));
      })
      //this.verify(); { }
    }
    catch (e) {
      console.log(e);
    }

  }
  async verify() {
    await this.fauth.auth.currentUser.sendEmailVerification()
  }
  async forgot(reset: string) {
    return await this.fauth.auth.sendPasswordResetEmail(reset);
  }
  async logout() {
    await this.fauth.auth.signOut()
    localStorage.removeItem('user')
    this.route.navigate(['login'])
    localStorage.clear();
  }
  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }


}
