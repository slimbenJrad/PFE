import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user : Observable<any>
  log : any ;
  x ={};
  constructor(private afDatabase : AngularFireDatabase) { }

  getUsers(name : string){
   this.afDatabase.database.ref(`user`).orderByChild('role').equalTo(name).once('value',(sn)=>{

    var xs = sn.val()
     for (var k in xs){
       this.x = xs[k]
       console.log("x",this.x)
     }
    
    console.log("xs",xs);
     console.log("sn",sn.val());
   })
  
   
  }
  getUsersSnap (name : string ){
    this.user= this.afDatabase.list(`user/${name}`).snapshotChanges().pipe(
      map(chang=>
        chang.map(c=>({key: c.payload.key, val : c.payload.val() }))
        )
    )
    return this.user
  }
}
