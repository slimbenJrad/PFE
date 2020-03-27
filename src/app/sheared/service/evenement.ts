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
  export class Evenement {
    user: User;
    logs: any;
    profile: Observable<any>
    constructor(public fauth: AngularFireAuth, public route: Router, private afDatabase: AngularFireDatabase) {
    /*  this.fauth.authState.subscribe(user => {
        if (user) {
          this.user = user;
          localStorage.setItem('user', JSON.stringify(this.user));
        } else {
          localStorage.setItem('user', null);
        }
      })*/
    }
    async event(titre,contenu) {
        try {
         // await this.fauth.auth.createUserWithEmailAndPassword(email, password);
          // console.log('succes',result)
          this.afDatabase.object('event').set({
            titre: titre,
            contenu: contenu,
          }).then(() => console.log("insrt lok"));
          
        }
        catch (e) {
          console.log(e);
        }
    
      }
  }
