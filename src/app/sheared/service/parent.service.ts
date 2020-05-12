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
    ref.orderByChild('code').equalTo(codep)
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
}
