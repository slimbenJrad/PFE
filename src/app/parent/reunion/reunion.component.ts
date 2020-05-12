import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicationService } from 'src/app/sheared/service/publication.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.css']
})
export class ReunionComponent implements OnInit {
  prof: any;
  heure:any;
  selectedprof:any;
  profile:any;
id_parent:any;
nom_eleve:string;
sujet:string;
mindate:Date;
date_reun: Date;
  constructor(private publication: PublicationService,public fauth: AngularFireAuth) {     this.mindate = new Date();
  }

  ngOnInit(): void {    this.profile = JSON.parse( localStorage.getItem('profil'));
  this.profile= this.fauth.authState.subscribe(data => {
    if (data) {
     this.id_parent=data.uid
     console.log("id",this.id_parent)
  }
  })
    this.prof=this.publication.getAllprof();
    console.log("prof",this.prof)
  }
  pubreunion(){
    this.publication.reunion(this.nom_eleve,this.sujet,this.date_reun.toString(),this.heure,this.id_parent,this.selectedprof)
  }
}
