import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/sheared/service/users.service';
import { Observable } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators'
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
@Input() name: string;
users :Observable<any>;
log : Observable<any> ;
items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
x =[];
  constructor(private router :ActivatedRoute,private userService : UsersService,private afDatabase : AngularFireDatabase) { }

  ngOnInit(): void {
    
    this.router.paramMap.subscribe(params=>{
      
      this.name = params.get('name');
     this.users = this.userService.getUsersSnap(this.name)
     this.users.subscribe(log =>{
       console.log(log)
     })
     this.log = this.userService.getUsers(this.name);
     this.log.subscribe(data =>{
       console.log("data",data);
     })
     //this.users = this.afDatabase.database.ref(`user`).orderByChild('role').equalTo(this.name);
     /*(sn)=>{
      
      var xs = sn.val()
     // this.users = sn.val();
      console.log(sn)
     for (var k in xs){
       this.x.push(xs[k])
      
     }
     //console.log("user",this.users)
    
     console.log("x",this.x)
    console.log("xs",xs);
     console.log("sn",sn.val());
     })*/
     
     
      
    
    
    })
  
   
    
  }

}
