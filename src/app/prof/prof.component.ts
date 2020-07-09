import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { ClasseService } from '../sheared/service/classe.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../sheared/service/users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { PublicationService } from '../sheared/service/publication.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from '../sheared/service/auth.service';
import { ChatService } from '../sheared/service/chat.service';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css']
})
export class ProfComponent implements OnInit {
  classe: Observable<any>;
  chatclasse: any;
  prof: Observable<any>;
  public model: any;
  id: any;
  profile: any;
  cours: Observable<any>;
  date: Date;
  state: any;
  comm: any;
  click: boolean;
  eleve: any;
  eleveclick: boolean;
  event: any;
  noti:any;
  untouched:any;
  reunion:any;
  untouchedReunion:any;
  constructor(private service : AuthService,private publication: PublicationService, public fauth: AngularFireAuth,  private group: ClasseService, private users: UsersService,private chat: ChatService) { }

  ngOnInit(): void {
    this.event=this.users.getevent().subscribe(data=>{
      this.event = data ;
      console.log('ev',this.event)
    })
  this.click = false; this.eleveclick = false;
    this.prof = this.publication.getAllprof();
    console.log("prof", this.prof)
    this.date = new Date();
    this.classe = this.group.getclasse();
    this.profile = JSON.parse(localStorage.getItem('profil'));
    console.log("key", this.profile)
    this.state = this.fauth.authState.subscribe(data => {
      if (data) {
        this.id = data.uid
        this.reunion=this.users.getreunion(this.id).subscribe(data=>{
          this.reunion = data ;
          console.log('reunion notif ',this.reunion )
        })
        this.untouchedReunion=this.chat.untouchedReunion(this.id).subscribe(data=>{
          this.untouchedReunion = data ;
          console.log('reunion untouched ',this.untouchedReunion )
        })
        this.untouched=this.chat.getuntouched(this.id).subscribe(data=>{
          this.untouched = data ;
          console.log('untouched',this.untouched)
        })
        this.noti=this.chat.profchatNotif(this.id).subscribe(data => {
          this.noti = data
          console.log("notification", this.noti)
        })
        this.chatclasse = this.group.classeaffected(this.id)
        this.chatclasse.subscribe(data => {
          this.chatclasse = data
          console.log("chatclasse", this.chatclasse)
        })
        this.cours = this.publication.getpublication(this.id);
        this.cours.subscribe(data => {
          this.comm = data;
          console.log("comm", this.comm)
        })
        console.log("id", this.id)
        console.log("cours", this.cours)
      }
    })

  }
  clicked() {
    this.click = !this.click;
  }
  eleves(ideez) {
    this.eleveclick = !this.eleveclick;
    this.eleve = this.group.geteleve(ideez).subscribe(data => {
      this.eleve = data;
      console.log("eleves", this.eleve)
    })
  }
  logout(){
    this.service.logout()
  }
  reverse(id){
    this.chat.Touch(this.id,id);
  }
  reversereunion(id){
    this.chat.reunionTouch(this.id,id);
  }
}
