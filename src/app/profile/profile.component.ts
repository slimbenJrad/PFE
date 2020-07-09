import { Component, OnInit } from '@angular/core';
import { UsersService } from '../sheared/service/users.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile:any;
  enfant;
  parent
  user;
  id;
  state;
  nom_vis:boolean;
  prenom_vis:boolean;
  mail_vis:boolean;
  tel_vis:boolean;
  classe_vis:boolean;
  All;
  constructor(private userService: UsersService,public fauth: AngularFireAuth) { }

  ngOnInit(): void {
    this.nom_vis=false;
    this.classe_vis=false;
    this.prenom_vis=false;
    this.tel_vis=false;
    this.mail_vis=false;
    this.profile = JSON.parse( localStorage.getItem('profil'));
  console.log("key",this.profile)
  this.userService.getUserId(this.profile.parent).subscribe(data =>{
    if(data){
      this.parent = data  ;
    }
    this.state= this.fauth.authState.subscribe(data => {
       this.id=data.uid
       this.userService.getUserId(this.id).subscribe(data =>{
        if(data){
          this.user = data  ;
        }
      })
      this.All=this.userService.allclasse(this.id).subscribe(data =>{
        this.All = data  ;         
         console.log("classes",this.All)
    })
       this.enfant=this.userService.getenfant(this.id).subscribe(data =>{
          this.enfant = data  ;
    })
  })
})
}
shownom(){
  this.nom_vis=!this.nom_vis;}
  classe(){
  this.classe_vis=!this.classe_vis;}
  showprenom(){
   this.prenom_vis=!this.prenom_vis;}
  num(){
   this.tel_vis=!this.tel_vis;}
  mail(){
   this.mail_vis=!this.mail_vis;}
   nouveaunom(event){
    this.userService.changenom(this.id,event.target.value)
    this.shownom()
  }
  nouveauprenom(event){
    this.userService.changeprenom(this.id,event.target.value)
    this.showprenom()
  }
  nouveaumail(event){
    this.userService.changemail(this.id,event.target.value)
    this.mail()
  }
  nouveaunum(event){
    this.userService.changenum(this.id,event.target.value)
    this.num()
  }
  nouveauclasse(event){
    this.userService.changeclasse(this.id,event.target.value)
    this.classe()
  }
  delete(classe){
    this.userService.deleteclasse(this.id,classe)
  }
}
