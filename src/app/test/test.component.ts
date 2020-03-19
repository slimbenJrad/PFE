import { Component, OnInit } from '@angular/core';
import { UsersService } from '../sheared/service/users.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

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
