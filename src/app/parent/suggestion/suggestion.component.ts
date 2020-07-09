import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { PublicationService } from 'src/app/sheared/service/publication.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {
  Sujet:string;
  selection:any;
  description:any;
  profile:any;
  id:any;
  date:Date;
  state;
  constructor(public fauth: AngularFireAuth,private publication: PublicationService) {this.date = new Date(); }

  ngOnInit(): void {
    this.profile = JSON.parse( localStorage.getItem('profil'));
    this.state= this.fauth.authState.subscribe(data => {
      if (data) {
       this.id=data.uid
       console.log("id personne",this.id)
    }
    })}
    pubsuggestion(){
      this.publication.suggestion(this.Sujet,this.date.toString(),this.description,this.id,this.selection,this.profile.firstName,this.profile.lastName)
    }

}
