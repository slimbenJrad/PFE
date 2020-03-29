import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { $ } from 'protractor';
@Injectable({
    providedIn: 'root'
  })
  export class Evenement {
    private uploadtask:firebase.storage.UploadTask;
private path:string='/uploads'
   
    profile: Observable<any>
    constructor(public fauth: AngularFireAuth, public route: Router, private afDatabase: AngularFireDatabase) {
    }
    async upload(img:any) {
      let num = Math.floor((Math.random() * 1000000))
      console.log(num,"num")
      let storageref:firebase.storage.Reference = firebase.storage().ref().child(`event/photo/${num}`);
      storageref.put(img);
      console.log("img",img)
        this.afDatabase.object('event').set({
         img: `${storageref}`,
        }).then(() => console.log("insrt lok"));
        
      }
    async event(titre,contenu,img) {
        try {
          this.afDatabase.object('event').set({
            titre: titre,
            contenu: contenu,
          }).then(() => console.log("insrt lok"));
        }
        catch (e) {console.log(e);}
        this.upload(img)
  }
  }