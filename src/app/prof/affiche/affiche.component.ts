import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { PublicationService } from 'src/app/sheared/service/publication.service';
import { UsersService } from 'src/app/sheared/service/users.service';
import { ClasseService } from 'src/app/sheared/service/classe.service';

@Component({
  selector: 'app-affiche',
  templateUrl: './affiche.component.html',
  styleUrls: ['./affiche.component.css']
})
export class AfficheComponent implements OnInit {
  selectedcours:FileList;
  selected: any;
  selection:any;
  classe: Observable<any>;
  prof: Observable<any>;
  titre_cours:string;
  file: File;
  public model :any;
  id : any ;
  user: any;
  profile:any;
  selectedValue:any;
  selectedprof:any;
  lien:any;
  cours:Observable<any>;
  date:Date;
  pubcomment:any;
  date_comment:Date;
  id_publication:any;
  subject: BehaviorSubject<any>;
data:any;
  constructor(private publication: PublicationService,public fauth: AngularFireAuth,private afDatabase: AngularFireDatabase,private userService: UsersService,private storage : AngularFireStorage,private group: ClasseService,private router: ActivatedRoute) { }

  ngOnInit(): void { 
    this.prof=this.publication.getAllprof();
    console.log("prof",this.prof)
     this.date= new Date();
     this.classe=this.group.getclasse();
    this.profile = JSON.parse( localStorage.getItem('profil'));
console.log("key",this.profile)
this.profile= this.fauth.authState.subscribe(data => {
  if (data) {
   this.id=data.uid
   this.cours=this.publication.getpublication(this.id);
   /*this.cours.subscribe(data=>{
     this.cours = data 
     console.log("publication ",this.cours)
   })*/
   console.log("id",this.id)
   console.log("cours",this.cours)
}
})


}

Navigate(url:any){
  console.log("lien",url)
    window.open(url, "_blank");
}
supp(id_pub){
  this.publication.deletepub(id_pub)
}


}
