import { Component, OnInit } from '@angular/core';
import { ToastService } from '../sheared/service/toast.service';
import { MatiereService } from '../sheared/service/matiere.service';
import { PublicationService } from '../sheared/service/publication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { EleveService } from '../sheared/service/eleve.service'
import { ParentService } from '../sheared/service/parent.service';
import { ClasseService } from '../sheared/service/classe.service';
import { AuthService } from '../sheared/service/auth.service';
import { UsersService } from '../sheared/service/users.service';
import { ChatService } from '../sheared/service/chat.service';

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.css']
})
export class EleveComponent implements OnInit {
  click:boolean;
  profile:any;
  profs;
  profclick;
  ev_notif;
  cours:any;
  corr:any;
  travail:any;
  grpnotif;
  parentnotif;
  id;
  state;
  untouched;
  constructor(private chat: ChatService,private event: UsersService,private group: ClasseService,public fauth: AngularFireAuth,private service : AuthService) { }

  ngOnInit(): void {      this.click=false; this.profclick=false;
    this.profile = JSON.parse( localStorage.getItem('profil'));
  console.log("profil",this.profile)
  this.state= this.fauth.authState.subscribe(data => {
    if (data) {
     this.id=data.uid
     this.untouched=this.chat.getuntouched(this.id).subscribe(data=>{
       this.untouched = data ;
       console.log("touch",this.untouched)
     })
     this.parentnotif=this.chat.profchatNotif(this.id).subscribe(data => {
      this.parentnotif= data
      console.log("parent notification", this.parentnotif)
    })
     console.log("id",this.id) }
  });

  this.grpnotif=this.group.grpNotif(this.profile.code).subscribe(data => {
    this.grpnotif = data;
    console.log("group",this.grpnotif)
  })
  this.profs = this.group.geteleve(this.profile.code).subscribe(data => {
    this.profs = data;
    console.log("profss", this.profs)
  })
  this.ev_notif=this.event.getevent().subscribe(data=>{
    this.ev_notif = data ;
    console.log('ev',this.ev_notif)
  })
  this.cours=this.group.coursNotif(this.profile.code).subscribe(data=>{
    this.cours = data ;
    console.log('cours',this.cours)
  })
  this.corr=this.group.corrNotif(this.profile.code).subscribe(data=>{
    this.corr = data ;
    console.log('correction',this.corr)
  })
  this.travail=this.group.TrNotif(this.profile.code).subscribe(data=>{
    this.travail = data ;
    console.log('travail',this.travail)
  })
}
clicked(){
  this.click = !this.click;
  this.profclick = !this.profclick;
}
drop(){
  this.profclick = !this.profclick;
}
logout(){
  this.service.logout()
}
reverse(id){
  this.chat.parentTouch(this.id,id);
}
}
