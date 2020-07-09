import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'src/app/sheared/service/publication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.css']
})
export class AcceptComponent implements OnInit {
  log : any ;
  profile:any;
  id:any;
  sugg : any ;
    questions: any;
    clam : any ;
    today;
  constructor(private reun: PublicationService,public fauth: AngularFireAuth) { }

  ngOnInit(): void {
    this.today=formatDate(new Date(), 'yyyy/MM/dd', 'en');
    console.log("today",this.today)
    this.profile = this.fauth.authState.subscribe(data => {
      this.id = data.uid
      console.log("id",this.id)
    this.log=this.reun.getaccepted(this.id).subscribe(data=>{
      this.log = data
      console.log("reun",this.log)
    })
    this.questions=this.reun.getQuest().subscribe(data=>{
      this.questions = data
      console.log("reun",this.questions)
    })
    this.clam=this.reun.getreclam().subscribe(data=>{
      this.clam = data
      console.log("codep",this.clam)
    })
    this.sugg=this.reun.getsuggestions().subscribe(data=>{
      this.sugg = data
      console.log("user",this.sugg)
    })
  })
  }

}
