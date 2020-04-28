import { Component, OnInit, Inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/sheared/service/users.service';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { Emploieservice } from 'src/app/sheared/service/emploie';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ClasseService } from 'src/app/sheared/service/classe.service';


@Component({
  selector: 'app-emploie',
  templateUrl: './emploie.component.html',
  styleUrls: ['./emploie.component.css']
})


export class EmploieComponent implements OnInit {
  @Input() name: string;
  log: Observable<any>;
  classe: Observable<any>;
  empl:any;
  selected : any ;
  id:string;
  
  constructor(private router: ActivatedRoute,private emp: Emploieservice, private userService: UsersService, private afDatabase: AngularFireDatabase,
    public dialog: MatDialog,private group: ClasseService) { }
    source:any;
  ngOnInit(): void {

    this.router.paramMap.subscribe(params => {
    this.name = params.get('name');
    console.log('role',this.name)
    this.selected=null;
    this.log =  this.userService.getUsers(this.name)
    this.classe=this.group.getclasse();
    console.log('class',this.classe)
    })
  }
  doSomething(){
    if (this.name=="prof"){
     this.emp.getEmploieProf(this.selected).subscribe(data=>{
       this.empl = data
       console.log('empl',this.empl.horaire)
       console.log('select',this.selected)
       this.source=this.empl.horaire
     })
    }
    else if(this.name=="eleve"){
      this.emp.getEmploieClass(this.selected).subscribe(data=>{
        this.empl = data
        console.log('empl',this.empl)
        console.log('select',this.selected)
        this.source=this.empl.horaire
      })
  }
}
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: 
      {id: this.selected,
      name:this.name}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
}
