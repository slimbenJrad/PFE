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
  constructor(private afDatabase: AngularFireDatabase,public fauth: AngularFireAuth) { }
  codeparent(codep:string){
    console.log("code",codep)
   this.user = this.afDatabase.list(`user`, ref =>
    ref.orderByChild('codeparent').equalTo(codep)
  ).snapshotChanges().pipe(
    //map a diviser l'objet en key et val()
    map(chang =>
      chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
    )
  ) 
  return this.user;
  
}
lier(codep){
  console.log(codep)
   this.fauth.authState.subscribe(auth => {
    console.log(auth.uid);
   this.afDatabase.object(`user/${auth.uid}/enf`).update({
      enfant1 : codep    }).then((rst) => console.log(rst));
    })
 }
}
