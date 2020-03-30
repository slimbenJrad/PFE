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
    private storageref2:firebase.storage.Reference
    constructor(public fauth: AngularFireAuth, public route: Router, private afDatabase: AngularFireDatabase) {
    }
    async upload(titre,contenu,img:any) {
      let num = Math.floor((Math.random() * 1000000))
      let storageref:firebase.storage.Reference
      let name="event"
      let date: Date = new Date();

      console.log(num,"num")
       storageref = firebase.storage().ref().child(`event/photo/${num}`);
       storageref.put(img);
       storageref.getDownloadURL();
       console.log("URL Download ",storageref.getDownloadURL())
       try {
        this.afDatabase.object(`${name}${num}`).set({
          titre: titre,
          contenu: contenu,
          img: `${storageref}`,
          date:date,
        })
      }catch (e) {console.log(e);}
      }
   /* async event(titre,contenu,img) {
        try {
          this.afDatabase.object('event').set({
            titre: titre,
            contenu: contenu,
            img: `${this.storageref2}`,
          }).then(() => console.log(titre));
        }
        catch (e) {console.log(e);}
        this.upload(img)
  }*/
  }