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
  islogged : boolean;
  verified:any;
  constructor(private service:AuthService,private router : Router,public fauth: AngularFireAuth) { }

  ngOnInit(): void {this.islogged = this.service.isLoggedIn
    console.log(this.islogged)
    this.profile = JSON.parse( localStorage.getItem('profil'));
console.log("key",this.profile)
this.profile= this.fauth.authState.subscribe(data => {
  if (data) {
   this.verified=data.emailVerified;
   console.log(this.verified)}})
  }
async login(email,password){
   this.log= this.service.login(email,password).then(() =>  setTimeout(() => {
    this.goDashbord();
 }, 1000)      );
    
   
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
  setTimeout(()=>{
  if(this.profile.role === 'admin'){
    this.router.navigate(['admin/dashboard']);
  }
  if(this.profile.role === 'prof'){
    this.router.navigate(['prof']);
  }
  if(this.profile.role === 'eleve'){
    this.router.navigate(['eleve']);
  }
  if(this.profile.role === 'parent'){
    this.router.navigate(['parent/dashparent']);
  }
  },2000)
}
goDashbord2(){
  this.profile = JSON.parse( localStorage.getItem('profil'));
  
    console.log(this.profile.role);
  if(this.profile.role !== 'admin'){
    this.router.navigate(['parent/dashboard']);
  }
}
}
