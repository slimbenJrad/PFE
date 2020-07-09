import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/sheared/service/chat.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-solo',
  templateUrl: './solo.component.html',
  styleUrls: ['./solo.component.css']
})
export class SoloComponent implements OnInit {
id:any;
id_el:any;
profile:any;
date:Date;
text:any;
state:any;
message:any;
  constructor(public fauth: AngularFireAuth,private router: ActivatedRoute, private chat:ChatService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.state= this.fauth.authState.subscribe(data => {
         this.id_el=data.uid
         this.message= this.chat.getparentmsg(this.id,this.id_el)
         this.message.subscribe(data=>{
          this.message = data
          console.log("all messages",this.message)
        })
         console.log("id el",this.id_el)
      });
      console.log(this.id)
      })
    this.profile = JSON.parse( localStorage.getItem('profil'));
  }
envoyer(event){ this.date = new Date();
this.chat.parentmsg(event.target.value,this.profile.firstName,this.profile.lastName,this.id,this.id_el,this.date.toString(),this.id_el,this.id)
console.log(event.target.value)
  this.text=""
}
}
