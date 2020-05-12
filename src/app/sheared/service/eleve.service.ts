import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastService } from './toast.service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EleveService {
  cours: Observable<any>
  user: Observable<any>
  comment:any;
  detail:any;
  constructor(private toaste : ToastService, private afDatabase: AngularFireDatabase) { }
  pub(titre,mat,Rq,lien:any,date:any,prof,id_eleve){
    let num = Math.floor((Math.random() * 1000000))
      let storageref:firebase.storage.Reference

      storageref = firebase.storage().ref().child(`publication/${num}`);
       //storageref.put(img);
       //console.log("img",img)
       storageref.getDownloadURL();
       
       //console.log("URL Download ",storageref.getDownloadURL())
       this.afDatabase.list(`publication/`+id_eleve).push({
        titre: titre,
        matiere: mat,
        fichier: lien,
        prof:prof,
        Remarque:Rq,
        date_creation:date,
      })
      this.toaste.showSuccess("Ajout avec success " , "success")
  }  
  getpublication(classe){
    this.cours = this.afDatabase.list(`publication`, ref =>
    ref.orderByChild('classe').equalTo(classe)
  ).snapshotChanges().pipe(
    //map a diviser l'objet en key et val()
    map(chang =>
      chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
    )
  ) 
  return this.cours;
}
getdetail(idpub){
  return this.afDatabase.object('publication/'+idpub).valueChanges()

}
commentowner(name) {
  //recupere l'objet de user ou son nom egal a la variable name
  this.user = this.afDatabase.list(`user/`+name 
  ).snapshotChanges().pipe(
    //map a diviser l'objet en key et val()
    map(chang =>
      chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
    )
  )
  return this.user;
}
}
