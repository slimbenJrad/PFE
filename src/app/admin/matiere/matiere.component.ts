import { Component, OnInit } from '@angular/core';
import { MatiereService } from 'src/app/sheared/service/matiere.service';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialoComponent } from './dialo/dialo.component';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit {
nom_mat:string
matiere:any;
  constructor(public dialog: MatDialog,private mat:MatiereService) { }

  ngOnInit(): void { this.matiere=this.mat.getAllMatiere();
    console.log("mat",this.matiere)
  }
matire(){
  this.mat.addMatiere(this.nom_mat)
}
supp(id){
  this.mat.deleteMatiere(id);
}
openDialog(matiere): void {
  const dialogRef = this.dialog.open(DialoComponent, {
    data: 
    {id: matiere}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}}
