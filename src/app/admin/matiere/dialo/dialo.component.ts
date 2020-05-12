import { Component, OnInit,Inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { MatiereService } from 'src/app/sheared/service/matiere.service';
import { FormsModule } from '@angular/forms';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/sheared/service/toast.service';
@Component({
  selector: 'app-dialo',
  templateUrl: './dialo.component.html',
  styleUrls: ['./dialo.component.css']
})
export class DialoComponent implements OnInit {
name:string
  constructor(private mat:MatiereService,public dialog: MatDialog,public dialogRef: MatDialogRef<DialoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,private toaste : ToastService)  { }

  ngOnInit(): void {console.log("key",this.data.id.key)
  }
  nom(){
    this.mat.changename(this.data.id.key,this.name)
    }
}
