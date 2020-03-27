import { Component, OnInit } from '@angular/core';
import { ParentService } from 'src/app/sheared/service/parent.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/sheared/service/users.service';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-dashparent',
  templateUrl: './dashparent.component.html',
  styleUrls: ['./dashparent.component.css']
})
export class DashparentComponent implements OnInit {

  codep : any ;
    users: Observable<any>
    log : any ;
    test = "123456"
  constructor(private service:ParentService,private router : Router,private afDatabase: AngularFireDatabase) { }
  ngOnInit(): void {
  }
   codeparent(codep){
    //console.log(codep)
    this.users= this.service.codeparent(codep);
    console.log("user",this.users)
    this.users.subscribe(data=>{
       this.log = data
      console.log("data",data)
    })
  } 
  lier(code :any ){
    this.service.lier(code)
  }
  
  }
