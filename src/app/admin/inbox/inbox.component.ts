import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'src/app/sheared/service/publication.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  respond : any;
  response: any;
  response2: any;
  sugg : any ;
    questions: any;
    clam : any 
    date_quest:Date;
    date_sugg:Date;
    date_clam:Date;
  constructor(private pub: PublicationService) { }

  ngOnInit(): void {
    this.questions=this.pub.getQuest().subscribe(data=>{
      this.questions = data
      console.log("pub",this.questions)
    })
    this.clam=this.pub.getreclam().subscribe(data=>{
      this.clam = data
      console.log("codep",this.clam)
    })
    this.sugg=this.pub.getsuggestions().subscribe(data=>{
      this.sugg = data
      console.log("user",this.sugg)
    })
  }
Repond(type,id){
  this.date_sugg = new Date();
  this.pub.Repondre(type,id,this.respond,this.date_sugg)
  this.respond=""
}
claim(type,id){
  this.date_clam = new Date();
  this.pub.Repondre(type,id,this.response,this.date_clam)
  this.response=""
}
quest(type,id){  
  this.date_quest = new Date();
  this.pub.Repondre(type,id,this.response2,this.date_quest)
  this.response2=""
}
}
