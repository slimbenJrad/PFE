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
  demande:Observable<any>
  accepted:Observable<any>
  suggestions:Observable<any>;
  constructor(private toaste : ToastService, private afDatabase: AngularFireDatabase) { }
  pub(titre,contenu:any,type,id,classe,lien:any,date:any,nom,prenom){
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
        user:id,
        nom_prof:nom,
        prenom_prof:prenom
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
  reunion(nom_eleve,sujet,date:any,heure:any,id_parent,id_prof,nom_prof,prenom_prof,nom_parent,prenom_parent,mail){
       this.afDatabase.list(`reunion`).push({
        nom_eleve: nom_eleve,
        mail_parent:mail,
        sujet: sujet,
        date: date,
        heure:heure,
        parent:id_parent,
        prof:id_prof,
        nom_prof:nom_prof,
        prenom_prof:prenom_prof,
        nom_parent:nom_parent,
        prenom_parent:prenom_parent,
        etat:"en attente"
      })
      this.toaste.showSuccess("Ajout avec success " , "success")
  }
  suggestion(sujet,date:any,description,id_parent,type,nom,prenom){
    this.afDatabase.list(type).push({
     sujet: sujet,
     date: date,
     description:description,
     auteur:id_parent,
     nom:nom,
     prenom:prenom,
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
getsuggestions(){
  this.suggestions = this.afDatabase.list(`suggestion`
  ).snapshotChanges().pipe(
  //map a diviser l'objet en key et val()
  map(chang =>
    chang.map(c => ({ key: c.payload.key, val: c.payload.val() })
    )
  )
)
return this.suggestions;
}
getreclam(){
  this.suggestions = this.afDatabase.list(`reclamaion`
  ).snapshotChanges().pipe(
  //map a diviser l'objet en key et val()
  map(chang =>
    chang.map(c => ({ key: c.payload.key, val: c.payload.val() })
    )
  )
)
return this.suggestions;
}
getQuest(){
  this.suggestions = this.afDatabase.list(`Question`
  ).snapshotChanges().pipe(
  //map a diviser l'objet en key et val()
  map(chang =>
    chang.map(c => ({ key: c.payload.key, val: c.payload.val() })
    )
  )
)
return this.suggestions;
}
getreunion(id){
  this.demande = this.afDatabase.list(`reunion/`,ref =>
  ref.orderByChild('prof').equalTo(id)
  ).snapshotChanges().pipe(
  //map a diviser l'objet en key et val()
  map(chang =>
    chang.map(c => ({ key: c.payload.key, val: c.payload.val() })
    )
  )
)
return this.demande;
}
Accepter(id_reun){
  this.afDatabase.object(`reunion/`+id_reun).update({
    etat:'Accepté',
  })
}
Refuser(id_reun){
  this.afDatabase.object(`reunion/`+id_reun).update({
    etat:'Refusé',
  })
}
Repondre(type,id_reun,response,date_rep){
  this.afDatabase.object(type+`/`+id_reun).update({
    reponse:response,
    date_rep:date_rep
  })
  this.toaste.showSuccess("Envoie avec success " , "success")
}
getaccepted(id){
  this.accepted = this.afDatabase.list(`reunion/`, ref =>
  ref.orderByChild('parent').equalTo(id)
  ).snapshotChanges().pipe(
  //map a diviser l'objet en key et val()
  map(chang =>
    chang.map(c => ({ key: c.payload.key, val: c.payload.val() })
    )
  )
)
return this.accepted;
}
deletepub(id_pub){
  this.afDatabase.list(`publication`).remove(id_pub)
  this.toaste.showSuccess("suppresion avec success " , "success")
}
comment(commentaire,id_pub,user,date,first,last){
 //ki yebda 2 variable fil chemin mta3 .list this.afDatabase.list(`publication/`+id_prof+`/`+id_pub+`/commentaire`).push({
  this.afDatabase.list(`commentaires/`+id_pub).push({
    user:user,
    firstName:first,
    lastName:last,
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
