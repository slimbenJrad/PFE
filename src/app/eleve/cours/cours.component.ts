import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EleveService } from 'src/app/sheared/service/eleve.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { PublicationService } from 'src/app/sheared/service/publication.service';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  cours:any;
  comment:any;
  aff:any;
  id:any;
  profile:any
  constructor(private publication: PublicationService,private service:EleveService,public fauth: AngularFireAuth) { }

  ngOnInit(): void { this.profile = JSON.parse( localStorage.getItem('profil'));
  console.log("key",this.profile)
    this.cours=this.service.getpublication(this.profile.code)
    

}
Navigate(url:any){
  console.log("lien",url)
    window.open(url, "_blank");
}


}
