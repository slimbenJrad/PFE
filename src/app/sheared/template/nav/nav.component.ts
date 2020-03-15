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
  constructor(private service : AuthService,public fauth: AngularFireAuth) { }

  ngOnInit(): void {
    this.islogged = this.service.isLoggedIn
    
    if(this.islogged){
      this.fauth.authState.subscribe(data =>{
        if(data){
          this.isVerif = data.emailVerified
        }
        
      })
    }
  

  console.log(this.islogged)
  }

}
