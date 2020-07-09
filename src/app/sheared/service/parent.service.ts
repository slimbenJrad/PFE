import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class ParentService {
  user: Observable<any>
  child:Observable<any>
  notif:Observable<any>
  constructor(private afDatabase: AngularFireDatabase,public fauth: AngularFireAuth) { }
  codeparent(codep:string){
    console.log("code",codep)
   this.user = this.afDatabase.list(`user`, ref =>
    ref.orderByChild('codep').equalTo(codep)
  ).snapshotChanges().pipe(
    //map a diviser l'objet en key et val()
    map(chang =>
      chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
    )
  )
  return this.user;

}
lier(enf_id){
  console.log("id enf",enf_id)
   this.fauth.authState.subscribe(auth => {
    console.log("uid",auth.uid);
   this.afDatabase.object(`user/`+enf_id).update({
      parent : auth.uid  }).then((rst) => console.log(rst));
    })
 }
 getchildren(parent) {
   console.log("par",parent)
  //recupere l'objet de user ou son nom egal a la variable name
  this.child = this.afDatabase.list(`user`, ref =>
    ref.orderByChild('parent').equalTo(parent)
  ).snapshotChanges().pipe(
    //map a diviser l'objet en key et val()
    map(chang =>
      chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
    )
  )
  return this.child;
}
getquestion(id) {
 this.notif = this.afDatabase.list(`Notif_parent/Question/`+id).snapshotChanges().pipe(
   map(chang =>
     chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
   )
 )
 return this.notif;
}
getreclam(id) {
  this.notif = this.afDatabase.list(`Notif_parent/reclamaion/`+id).snapshotChanges().pipe(
    map(chang =>
      chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
    )
  )
  return this.notif;
 }
 getsugg(id) {
  this.notif = this.afDatabase.list(`Notif_parent/suggestion/`+id).snapshotChanges().pipe(
    map(chang =>
      chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
    )
  )
  return this.notif;
 }
}
