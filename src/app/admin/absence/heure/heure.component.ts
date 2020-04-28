import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'src/app/sheared/service/toast.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AbsenceService } from 'src/app/sheared/service/absence.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-heure',
  templateUrl: './heure.component.html',
  styleUrls: ['./heure.component.css']
})
export class HeureComponent implements OnInit {
  date_abs: Date;
  maxdate:Date;
  nbr:number;
  id_Abs: Observable<any>;
  id_Absence: any
  eleve: Observable<any>
  id_eleve:any
  constructor(private Abs:AbsenceService,private afDatabase: AngularFireDatabase,public dialogRef: MatDialogRef<HeureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,private toaste : ToastService) { this.maxdate = new Date();}

  ngOnInit(): void {  this.id_eleve=this.data.id

  }
 ajouterAbsence(){
   this.Abs.addAbsence(this.nbr,this.date_abs,this.id_eleve)
 }
 deleteAbsence(){
  this.id_Abs=this.Abs.getidAbsence(this.id_eleve)
  console.log("idabs",this.id_Abs)
  this.Abs.deleteAbsence(this.date_abs,this.id_eleve)
 }

}
