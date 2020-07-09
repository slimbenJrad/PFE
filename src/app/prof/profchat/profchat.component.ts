import { Component, OnInit } from '@angular/core';
import { ClasseService } from 'src/app/sheared/service/classe.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChatService } from 'src/app/sheared/service/chat.service';

@Component({
  selector: 'app-profchat',
  templateUrl: './profchat.component.html',
  styleUrls: ['./profchat.component.css']
})
export class ProfchatComponent implements OnInit {
  classe:any;
  id:any;
  state;
  profile;
  date:Date;
  text;
  message;
  constructor( private chat:ChatService,public fauth: AngularFireAuth,private router: ActivatedRoute) { }

  ngOnInit(): void {this.date = new Date();
    this.router.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.profile = JSON.parse( localStorage.getItem('profil'));
      console.log("profile",this.profile)
      this.state= this.fauth.authState.subscribe(data => {
         this.state=data.uid
         console.log("prof en cours",this.state)
         this.message= this.chat.getprofmsg(this.state,this.id)
       this.message.subscribe(data=>{
        this.message = data
        console.log("all messages",this.message)
      })
      });
      console.log("id eleve",this.id)
      })
  }
envoyer(event){this.date = new Date();
this.chat.profmsg(event.target.value,this.profile.firstName,this.profile.lastName,this.state,this.id,this.date.toString(),this.state,this.id)
console.log(event.target.value)
this.text=""
}

}
