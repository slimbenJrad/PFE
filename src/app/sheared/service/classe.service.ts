import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  classe: Observable<any>
  affected: Observable<any>
  eleve: Observable<any>
  publi:Observable<any>;
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
  classeaffected(id_prof) {
    this.affected = this.afDatabase.list(`Affectation/`+id_prof).snapshotChanges().pipe(
      //map a diviser l'objet en key et val()
      map(chang =>
        chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
      )
    )
    return this.affected;
  }
  geteleve(id_classe) {
    this.eleve = this.afDatabase.list(`user`, ref =>
    ref.orderByChild('code').equalTo(id_classe)
  ).snapshotChanges().pipe(
      //map a diviser l'objet en key et val()
      map(chang =>
        chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
      )
    )
    return this.eleve;
  }
  coursNotif(id_classe){
    this.publi = this.afDatabase.list('publi_notif/cours',ref =>
    ref.orderByChild('classe').equalTo(id_classe)).snapshotChanges().pipe(
      map(chang =>
        chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
      )
    )
    return this.publi;
  }
  corrNotif(id_classe){
    this.publi = this.afDatabase.list('publi_notif/correction',ref =>
    ref.orderByChild('classe').equalTo(id_classe)).snapshotChanges().pipe(
      map(chang =>
        chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
      )
    )
    return this.publi;
  }
  TrNotif(id_classe){
    this.publi = this.afDatabase.list('publi_notif/travail',ref =>
    ref.orderByChild('classe').equalTo(id_classe)).snapshotChanges().pipe(
      map(chang =>
        chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
      )
    )
    return this.publi;
  }
  grpNotif(id_classe){
    this.publi = this.afDatabase.list('group_notif/'+id_classe).snapshotChanges().pipe(
      map(chang =>
        chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
      )
    )
    return this.publi;
  }
}
