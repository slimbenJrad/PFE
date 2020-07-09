import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChatService } from '../sheared/service/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  date:Date;
  text:string;
  profile:any;
  id:any;
  message:any;
  constructor(public fauth: AngularFireAuth,private chat:ChatService) { }

  ngOnInit(): void { this.profile = JSON.parse( localStorage.getItem('profil'));
  console.log("key",this.profile)
  this.message=  this.chat.getchat(this.profile.code)
  this.message.subscribe(data=>{
    this.message = data
    console.log("all cmntr",this.message)
  })
  this.id= this.fauth.authState.subscribe(data => {
    if (data) {
     this.id=data.uid
     console.log("id",this.id) }
  });
  }
msg(event){ this.date = new Date();
  this.chat.msg(event.target.value,this.profile.firstName,this.profile.lastName,this.profile.code,this.id,this.date.toString()) 
  console.log(event.target.value)
  this.text=""
}
}
