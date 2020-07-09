import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
matiere:any;
  constructor(private toaste : ToastService,private afDatabase: AngularFireDatabase) { }
  addMatiere(nom){
  this.afDatabase.list(`Matiere`).push({
  nom:nom
  })
  this.toaste.showSuccess("Ajout avec success " , "success")
}
getAllMatiere (){
    //recupere l'objet de user ou son nom egal a la variable name
    this.matiere = this.afDatabase.list('Matiere').snapshotChanges().pipe(
      //map a diviser l'objet en key et val()
      map(chang =>
        chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
      )
    )
    return this.matiere;
}
deleteMatiere(id_mat,){
  this.afDatabase.list(`Matiere`).remove(id_mat)
  this.toaste.showSuccess("suppresion avec success " , "success")
}
changename(id_mat,nom){
  this.afDatabase.object(`Matiere/`+id_mat).set({
    nom:nom,
  })
}
Affectation(id_prof,classe,matiere,name){
this.afDatabase.list(`Affectation/`+id_prof+`/`+classe).push({
nom:name,
id:matiere
})
this.toaste.showSuccess("Affectation avec success " , "success")
}
}
