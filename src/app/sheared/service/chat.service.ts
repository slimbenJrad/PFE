import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chat:Observable<any>;
  Notif:Observable<any>;
  chat_parent:Observable<any>;
  chat_prof:Observable<any>;
  constructor(private afDatabase: AngularFireDatabase,public fauth: AngularFireAuth) { }
  msg(text,nom,prenom,classe,id,date){
    this.afDatabase.list(`chat/group/`+classe).push({
      text:text,
      user: id,
      name:nom,
      lastname:prenom,
      date:date,
    })
  }
  getchat(id_classe){
     this.chat = this.afDatabase.list(`chat/group/`+id_classe).snapshotChanges().pipe(
     //map a diviser l'objet en key et val()
     map(chang =>
       chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
     )
   )
   return this.chat;
   }
   parentmsg(text,nom,prenom,id_par,id_enf,date,id_sender,id_dest){
    this.afDatabase.list(`chat/solo/parents/`+id_par+`/`+id_enf).push({
      text:text,
      user: id_sender,
      name:nom,
      lastname:prenom,
      dest:id_dest,
      date:date
    })
  }
  getparentmsg(id_par,id_enf){
    this.chat_parent = this.afDatabase.list(`chat/solo/parents/`+id_par+`/`+id_enf).snapshotChanges().pipe(
    //map a diviser l'objet en key et val()
    map(chang =>
      chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
    )
  )
  return this.chat_parent;
  }
  profmsg(text,nom,prenom,id_prof,id_eleve,date,id_sender,id_dest){
    this.afDatabase.list(`chat/solo/profs/`+id_prof+`/`+id_eleve).push({
      text:text,
      user: id_sender,
      name:nom,
      lastname:prenom,
      dest:id_dest,
      date:date,
    })
  }
  getprofmsg(id_prof,id_eleve){
    this.chat_prof = this.afDatabase.list(`chat/solo/profs/`+id_prof+`/`+id_eleve).snapshotChanges().pipe(
    //map a diviser l'objet en key et val()
    map(chang =>
      chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
    )
  )
  return this.chat_prof;
  }
  parentNotif(id_parent){
    this.Notif = this.afDatabase.list(`Notification`,ref =>
    ref.orderByChild('dest').equalTo(id_parent)).snapshotChanges().pipe(
    //map a diviser l'objet en key et val()
    map(chang =>
      chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
    )
  )
  return this.Notif;
  }
  getuntouched(id_dest){
    this.Notif = this.afDatabase.list(`Notification/`+id_dest,ref =>
    ref.orderByChild('touched').equalTo(false)).snapshotChanges().pipe(
    //map a diviser l'objet en key et val()
    map(chang =>
      chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
    )
  )
  return this.Notif;
  }
  parentTouch(id,id_notif){
    this.afDatabase.object('Notification/'+id+'/'+id_notif).update({
      touched:true
    })
  }
  questionTouch(id,id_notif){
    this.afDatabase.object('Notif_parent/Question/'+id+'/'+id_notif).update({
      touched:true
    })
  }
  reclamTouch(id,id_notif){
    this.afDatabase.object('Notif_parent/reclamaion/'+id+'/'+id_notif).update({
      touched:true
    })
  }
  suggTouch(id,id_notif){
    this.afDatabase.object('Notif_parent/suggestion/'+id+'/'+id_notif).update({
      touched:true
    })
  }
  profchatNotif(id_dest){
    this.Notif = this.afDatabase.list(`Notification/`+id_dest).snapshotChanges().pipe(
    //map a diviser l'objet en key et val()
    map(chang =>
      chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
    )
  )
  return this.Notif;
  }
  Touch(id_dest,id_notif){
    this.afDatabase.object('Notification/'+id_dest+'/'+id_notif).update({
      touched:true
    })
  }
  untouchedReunion(id){
    this.Notif = this.afDatabase.list(`prof_reunion/`+id,ref =>
    ref.orderByChild('touched').equalTo(false)).snapshotChanges().pipe(
    map(chang =>
      chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
    )
  )
  return this.Notif;
  }
  reunionTouch(id_prof,id_notif){
    this.afDatabase.object('prof_reunion/'+id_prof+'/'+id_notif).update({
      touched:true
    })
  }
}
