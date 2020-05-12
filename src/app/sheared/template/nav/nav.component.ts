import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  islogged : boolean;
  isVerif : boolean ; 
  role:any;
  constructor(private service : AuthService,public fauth: AngularFireAuth) { }

  ngOnInit(): void {
    this.islogged = this.service.isLoggedIn
    this.role = JSON.parse(localStorage.getItem('profil'));
    console.log(this.role.role);
  console.log(this.islogged)
  }
  logout(){
    this.service.logout()
  }
}
