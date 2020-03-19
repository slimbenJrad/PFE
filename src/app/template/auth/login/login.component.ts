import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/sheared/service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userEmail : string ;
  userPassword : string;
  verifedMail : boolean = true ;
  profile : any;
  log : any ;
  constructor(private service:AuthService,private router : Router) { }

  ngOnInit(): void {
  }
async login(email,password){
  this.service.login(email,password);
  setTimeout(()=>{
    this.goDashbord();
  },1000)
  

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
goDashbord(){
  this.profile = JSON.parse( localStorage.getItem('profil'));
  
    console.log(this.profile.role);
  if(this.profile.role === 'admin'){
    this.router.navigate(['admin/dashboard']);
  }
  

}
goDashbord2(){
  this.profile = JSON.parse( localStorage.getItem('profil'));
  
    console.log(this.profile.role);
  if(this.profile.role !== 'admin'){
    this.router.navigate(['parent/dashboard']);
  }
}
}
