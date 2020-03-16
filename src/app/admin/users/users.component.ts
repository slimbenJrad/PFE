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
  //@input ()name : recupere la varibale name de users/:name dans routing module du adress(admin/parent par exemple)
  @Input() name: string;

  log: Observable<any>;
  constructor(private router: ActivatedRoute, private userService: UsersService, private afDatabase: AngularFireDatabase) { }

  ngOnInit(): void {

    this.router.paramMap.subscribe(params => {

      this.name = params.get('name');
      /* this.users = this.userService.getUsersSnap(this.name)
       this.users.subscribe(log =>{
         console.log(log)
       })*/
      this.log = this.userService.getUsers(this.name);
     /* this.log.subscribe(data => {
        console.log("data", data);
      })*/

    })



  }

}
