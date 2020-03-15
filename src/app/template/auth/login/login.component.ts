import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/sheared/service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userEmail : string ;
  userPassword : string;
  verifedMail : boolean = true ;
  constructor(private service:AuthService,public fauth:AngularFireAuth) { }

  ngOnInit(): void {
  }
async login(email,password){

this.service.login(email,password);
/*setTimeout(() => {
   this.fauth.authState.subscribe(data =>{
    this.verifedMail = data.emailVerified
    console.log(this.verifedMail);
  })
}, 1000);*/
 


}
logout(){
  this.service.logout()
}
}
