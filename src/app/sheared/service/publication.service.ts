import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  user: Observable<any>
  publication: Observable<any>
  Allcomments: Observable<any>
  constructor(private toaste : ToastService, private afDatabase: AngularFireDatabase) { }
  pub(titre,contenu:any,type,id,classe,lien:any,date:any){
    let num = Math.floor((Math.random() * 1000000))
      let storageref:firebase.storage.Reference

      storageref = firebase.storage().ref().child(`publication/${num}`);
       //storageref.put(img);
      // console.log("img",img)
       storageref.getDownloadURL();
       
       //console.log("URL Download ",storageref.getDownloadURL())
       this.afDatabase.list(`publication/`).push({
        titre: titre,
        contenu: contenu,
        fichier: lien,
        type:type,
        classe:classe,
        date_creation:date,
        user:id
      })
      this.toaste.showSuccess("Ajout avec success " , "success")
  }
  getAllprof() {
    //recupere l'objet de user ou son nom egal a la variable name
    this.user = this.afDatabase.list(`user`, ref =>
      ref.orderByChild('role').equalTo('prof')
    ).snapshotChanges().pipe(
      //map a diviser l'objet en key et val()
      map(chang =>
        chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
      )
    )
    return this.user;
  }
  reunion(nom_eleve,sujet,date:any,heure:any,id_parent,id_prof){
       this.afDatabase.list(`reunion/`+id_parent).push({
        nom_eleve: nom_eleve,
        sujet: sujet,
        date: date,
        heure:heure,
        prof:id_prof,
        etat:"en attente"
      })
      this.toaste.showSuccess("Ajout avec success " , "success")
  }
  suggestion(sujet,date:any,description,id_parent,type){
    this.afDatabase.list(type+`/`+id_parent).push({
     sujet: sujet,
     date: date,
     description:description
   })
   this.toaste.showSuccess("Envoie avec success " , "success")
}
getpublication(id){
  this.publication = this.afDatabase.list(`publication/`, ref =>
  ref.orderByChild('user').equalTo(id)
  ).snapshotChanges().pipe(
  //map a diviser l'objet en key et val()
  map(chang =>
    chang.map(c => ({ key: c.payload.key, val: c.payload.val() })
    )
  )
)
return this.publication;
}

deletepub(id_pub){
  this.afDatabase.list(`publication`).remove(id_pub)
  this.toaste.showSuccess("suppresion avec success " , "success")
}
comment(commentaire,id_pub,user,date){
 //ki yebda 2 variable fil chemin mta3 .list this.afDatabase.list(`publication/`+id_prof+`/`+id_pub+`/commentaire`).push({
  this.afDatabase.list(`commentaires/`+id_pub).push({
    user:user,
    comment: commentaire,
    date:date,
  }) 
  
}
getcomment(id){
  this.Allcomments = this.afDatabase.list(`commentaires/`+id).snapshotChanges().pipe(
  //map a diviser l'objet en key et val()
  map(chang =>
    chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
  )
)
return this.Allcomments;
}
changetitre(id_pub,titre){
  this.afDatabase.object(`publication/`+id_pub).update({
    titre:titre,
  })
}
changecontenu(id_pub,contenu){
  this.afDatabase.object(`publication/`+id_pub).update({
    contenu:contenu,
  })
}
changetype(id_pub,type){
  this.afDatabase.object(`publication/`+id_pub).update({
    type:type,
  })
}
changeclasse(id_pub,classe){
  this.afDatabase.object(`publication/`+id_pub).update({
    classe:classe,
  })
}
}
