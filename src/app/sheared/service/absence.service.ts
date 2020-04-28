import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'src/app/sheared/service/toast.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  Abs: Observable<any>

  constructor(private toaste : ToastService,private afDatabase: AngularFireDatabase) { }
  addAbsence(heure,date,id_eleve){
        //this.afDatabase.list(`Absence/${this.data.id}`).push({
      this.afDatabase.list(`Absence/`+id_eleve).push({
      nbr:heure,
      date_abs:date.toString()
      })
      this.toaste.showSuccess("Ajout avec success " , "success")
  }
  deleteAbsence(id_date,id_eleve){
  this.afDatabase.list(`Absence/`+id_eleve).remove(id_date)
  this.toaste.showSuccess("suppresion avec success " , "success")
}
getidAbsence(id_eleve) {
  this.Abs = this.afDatabase.list(`Absence/`+id_eleve).snapshotChanges().pipe(
    //map a diviser l'objet en key et val()
    map(chang =>
      chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
    )
  )
  return this.Abs;
}
  getAllAbsence (id_eleve){
    
    return this.afDatabase.list('Absence/'+id_eleve).valueChanges();
  }
}
