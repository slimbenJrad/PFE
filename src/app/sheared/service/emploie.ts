import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
  export class Emploieservice {
    user: Observable<any>
    user2 : Observable<any> 
    classe: Observable<any>

    constructor(private afDatabase: AngularFireDatabase) { }
  
    getEmploieProf(id) {
return this.afDatabase.object('emploie/prof/'+id).valueChanges()
}
getEmploieClass(id:any){
  return this.afDatabase.object('emploie/classe/'+id).valueChanges()
}
}