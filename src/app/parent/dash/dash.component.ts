import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/sheared/service/auth.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/sheared/service/users.service';
import {  Observable } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  codep : any ;
    users: Observable<any>
    log : any ;
    test = "123456"
  constructor(private service:UsersService,private router : Router) { }
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
}
