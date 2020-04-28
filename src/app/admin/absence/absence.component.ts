import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/sheared/service/users.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { HeureComponent } from './heure/heure.component';
import { map } from 'rxjs/operators';
import { AbsenceService } from 'src/app/sheared/service/absence.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {
  user: any;
  id : any ;
  allAbsence:any
  abs : any ;
  totalHour:number=0;
  term : any;
  maxdate: Date;
  datee: string;
  constructor(private absenceService:AbsenceService,private router: ActivatedRoute, private userService: UsersService,private afDatabase: AngularFireDatabase
    ,public dialog: MatDialog) {     this.maxdate = new Date();
    }
  ngOnInit(): void { 
    this.router.paramMap.subscribe(params => {
      this.id = params.get('id');
       this.userService.getUserId(this.id).subscribe(data =>{
         if(data){
           this.user = data  ;
         }
       
       })
      
      this.absenceService.getidAbsence(this.id).subscribe(data=>{
        this.allAbsence=data;
        console.log('obj',this.allAbsence)
        
        for(let x of this.allAbsence){
          this.totalHour = this.totalHour+parseInt(x.nbr)
        }
        console.log("totalHour",this.totalHour)
        }
      )
     
    })
   
   
  }

openDialog(): void {console.log(this.term)
  const dialogRef = this.dialog.open(HeureComponent, {
    data: {id:this.id}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
delete(id){
  console.log("id abs ",id)
this.absenceService.deleteAbsence(id,this.id)
}
}
