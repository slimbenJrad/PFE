import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user : Observable<any>
  log : Observable<any> ;
  x ={};
  constructor(private afDatabase : AngularFireDatabase) { }

  getUsers(name : string){
   this.log =  this.afDatabase.list(`user`,ref=> 
      ref.orderByChild('role').equalTo(name)
      
     
     
    ).snapshotChanges().pipe(
      map(chang=>
        chang.map(c=>({key: c.payload.key, val : c.payload.val() }))
        )
    )

    console.log(this.log)
   return this.log ;

  
   
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
