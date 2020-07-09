import { Component, OnInit } from '@angular/core';
import { ParentService } from 'src/app/sheared/service/parent.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/sheared/service/auth.service';
import { ChatService } from 'src/app/sheared/service/chat.service';
import { UsersService } from 'src/app/sheared/service/users.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  click:boolean;
  child_id:any;
  profile:any;
  id:any;
  state:any;
  notif:any;
  untouched:any;
  ev_notif:any;
  reclam:any;
  question:any;
  sugg:any;
  constructor(private event: UsersService,public fauth: AngularFireAuth,private parent: ParentService,private service : AuthService,private chat: ChatService) { }

  ngOnInit(): void {this.click=false;
    this.ev_notif=this.event.getevent();
    this.ev_notif.subscribe(data=>{
      this.ev_notif = data ;
      console.log('ev',this.ev_notif)
    })
    this.profile = JSON.parse( localStorage.getItem('profil'));
    this.state= this.fauth.authState.subscribe(data => {
      if (data) {
       this.id=data.uid;
       this.sugg=this.parent.getsugg(this.id).subscribe(data=>{
        this.sugg = data ;
        console.log("sugg",this.sugg)
      })
      this.question=this.parent.getquestion(this.id).subscribe(data=>{
        this.question = data ;
        console.log("quest",this.question)
      })
      this.reclam=this.parent.getreclam(this.id).subscribe(data=>{
        this.reclam = data ;
        console.log("reclam",this.reclam)
      })
       this.notif=this.chat.profchatNotif(data.uid);
       this.notif.subscribe(data=>{
        this.notif = data ;
        console.log('not',this.notif)
      })
       this.child_id=this.parent.getchildren(this.id).subscribe(data=>{
         this.child_id = data ;
         console.log("log data  child",this.child_id)
       })
       console.log("id",this.id) }
    });
    this.untouched=this.chat.getuntouched(this.id)
    this.untouched.subscribe(data=>{
      this.untouched = data ;
      console.log("touch",this.untouched)
    })
    }
  clicked(){
    this.click = !this.click;
  }
  logout(){
    this.service.logout()
  }
  reverse(id){
    this.chat.parentTouch(this.id,id);
  }
  questreverse(id_quest){
    this.chat.questionTouch(this.id,id_quest);
  }
  reclamreverse(id_reclam){
    this.chat.reclamTouch(this.id,id_reclam);
  }
  suggreverse(id_sugg){
    this.chat.suggTouch(this.id,id_sugg);
  }
}
