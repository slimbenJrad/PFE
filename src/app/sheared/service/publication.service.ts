import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private toaste : ToastService, private afDatabase: AngularFireDatabase) { }
  pub(titre,contenu:any,img:any,type,id,classe,lien:any){
    let num = Math.floor((Math.random() * 1000000))
      let storageref:firebase.storage.Reference
      let date: Date = new Date();
      

      storageref = firebase.storage().ref().child(`publication/${num}`);
       //storageref.put(img);
       console.log("img",img)
       storageref.getDownloadURL();
       
       //console.log("URL Download ",storageref.getDownloadURL())
       this.afDatabase.list(`publication/`+id).push({
        titre: titre,
        contenu: contenu,
        fichier: lien,
        type:type,
        classe:classe,
        date:date,
      })
      this.toaste.showSuccess("Ajout avec success " , "success")
  }
}
