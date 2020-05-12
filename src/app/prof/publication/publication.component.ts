import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'src/app/sheared/service/publication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { UsersService } from 'src/app/sheared/service/users.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { ClasseService } from 'src/app/sheared/service/classe.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
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
  date:Date;
  constructor(private publication: PublicationService,public fauth: AngularFireAuth,private afDatabase: AngularFireDatabase,private userService: UsersService,private storage : AngularFireStorage,private group: ClasseService,private router: ActivatedRoute) { }

  ngOnInit(): void { 
    console.log("publication")
    this.prof=this.publication.getAllprof();
    console.log("prof",this.prof)
     this.date= new Date();
     this.classe=this.group.getclasse();
    this.profile = JSON.parse( localStorage.getItem('profil'));
console.log("key",this.profile)
this.profile= this.fauth.authState.subscribe(data => {
  if (data) {
   this.id=data.uid
   console.log("id",this.id)
}
})
}
choosecours(cours){
  console.log("cour",cours);
  this.selectedcours = cours.target.files;
  if(this.selectedcours.item(0)){
    console.log("caught",this.selectedcours.item(0))
    this.uplaodcours()
  }
}
uplaodcours(){
  let file = this.selectedcours.item(0);
  console.log("file",file)
  let uniquekey = 'cours' +Math.floor(Math.random() *10000000);
  const filRef= this.storage.ref(`cours/${this.id}/${uniquekey}`);
  const uploadTask = this.storage.upload(`cours/${this.id}/${uniquekey}`,file);
  uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
    //Fetch the download URL of the Storage file
    uploadSnapshot.ref.getDownloadURL().then(downloadURL=> {
      this.lien = downloadURL ;
      console.log("URL",downloadURL)
    })
  })
}

publi(){
  console.log("selectedValue",this.selectedValue)
  if(this.lien){    
  this.publication.pub(this.titre_cours,this.model,this.selection,this.id,this.selectedValue,this.lien,this.date.toString())
    } 
  }
}
