import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  classe: Observable<any>

  constructor(private afDatabase: AngularFireDatabase) { }
  getclasse() {
    this.classe = this.afDatabase.list(`class`).snapshotChanges().pipe(
      //map a diviser l'objet en key et val()
      map(chang =>
        chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
      )
    )
    return this.classe;
  }
}
