import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/sheared/service/chat.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profsolo',
  templateUrl: './profsolo.component.html',
  styleUrls: ['./profsolo.component.css']
})
export class ProfsoloComponent implements OnInit {
date:Date;
id;
profile;
state;
message;
text;
  constructor( private chat:ChatService,public fauth: AngularFireAuth,private router: ActivatedRoute) { }

  ngOnInit(): void {this.date = new Date();
    this.router.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.profile = JSON.parse( localStorage.getItem('profil'));
      console.log("profile",this.profile)
      this.state= this.fauth.authState.subscribe(data => {
         this.state=data.uid
         console.log("eleve en cours",this.state)
         this.message= this.chat.getprofmsg(this.id,this.state)
       this.message.subscribe(data=>{
        this.message = data
        console.log("all messages",this.message)
      })
      });
      console.log("id prof",this.id)
      })
  }
envoyer(event){ this.date = new Date();
this.chat.profmsg(event.target.value,this.profile.firstName,this.profile.lastName,this.id,this.state,this.date.toString(),this.state,this.id)
console.log(event.target.value)
this.text=""
}
}
