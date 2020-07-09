import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/sheared/service/chat.service';

@Component({
  selector: 'app-enfant-chat',
  templateUrl: './enfant-chat.component.html',
  styleUrls: ['./enfant-chat.component.css']
})
export class EnfantChatComponent implements OnInit {
  id_enf:any;
  state:any;
  id_par:any;
  message:any;
  date:Date;
  profile:any;
  text:any;
  constructor(public fauth: AngularFireAuth,private router: ActivatedRoute, private chat:ChatService) { }


  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
    this.id_enf = params.get('id');
    this.state= this.fauth.authState.subscribe(data => {
       this.id_par=data.uid
       this.message= this.chat.getparentmsg(this.id_par,this.id_enf)
       this.message.subscribe(data=>{
        this.message = data
        console.log("all messages",this.message)
      })
       console.log("id enf",this.id_enf)
    });
    console.log("parent",this.id_par)
    })
    this.profile = JSON.parse( localStorage.getItem('profil'));

  }
  send(event){ this.date = new Date();
    this.chat.parentmsg(event.target.value,this.profile.firstName,this.profile.lastName,this.id_par,this.id_enf,this.date.toString(),this.id_par,this.id_enf)
    console.log(event.target.value)
      this.text=""
    }
}
