import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { ClasseService } from '../sheared/service/classe.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../sheared/service/users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { PublicationService } from '../sheared/service/publication.service';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css']
})
export class ProfComponent implements OnInit {
  selectedcours:FileList;
  selected: any;
  selection:any;
  classe: Observable<any>;
  titre_cours:string;
  file: File;
  public model :any;
  id : any ;
  user: any;
  profile:any;
  selectedValue:any;
  lien:any;
  constructor(private publication: PublicationService, public fauth: AngularFireAuth,private afDatabase: AngularFireDatabase,private userService: UsersService,private storage : AngularFireStorage,private group: ClasseService,private router: ActivatedRoute) { }

  ngOnInit(): void {    this.classe=this.group.getclasse();
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
    this.publication.pub(this.titre_cours,this.model,this.file,this.selection,this.id,this.selectedValue,this.lien)
      } 
    }
    }
