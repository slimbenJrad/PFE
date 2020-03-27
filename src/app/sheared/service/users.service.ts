import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user: Observable<any>
  user2 : Observable<any> 

  constructor(private afDatabase: AngularFireDatabase) { }

  getUsers(name: string) {
    //recupere l'objet de user ou son nom egal a la variable name
    this.user = this.afDatabase.list(`user`, ref =>
      ref.orderByChild('role').equalTo(name)
    ).snapshotChanges().pipe(
      //map a diviser l'objet en key et val()
      map(chang =>
        chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
      )
    )
    return this.user;
  }
  
  }
  /*getUsersSnap (name : string ){
    this.user= this.afDatabase.list(`user/${name}`).snapshotChanges().pipe(
      map(chang=>
        chang.map(c=>({key: c.payload.key, val : c.payload.val() }))
        )
    )
    return this.user
  }*/

