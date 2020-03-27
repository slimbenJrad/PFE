import { Component, OnInit } from '@angular/core';
import { UsersService } from '../sheared/service/users.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ParentService } from '../sheared/service/parent.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  codep : any ;
    user: Observable<any>
    log : any ;
    test = "123456"
  constructor(private service:ParentService,private router : Router,private afDatabase: AngularFireDatabase) { }
  ngOnInit(): void {
  }
   codeparent(codep){
    //console.log(codep)
    this.user= this.service.codeparent(codep);
    console.log("user",this.user)
    this.user.subscribe(data=>{
       this.log = data
      console.log("data",data)
    })
  } 
  lier(code :any ){
    this.service.lier(code)
    console.log(code)
  }
  
  }

