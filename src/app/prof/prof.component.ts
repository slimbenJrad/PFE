import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { ClasseService } from '../sheared/service/classe.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../sheared/service/users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { PublicationService } from '../sheared/service/publication.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'

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
  comment:boolean;
  pubcomment:any;
  date_comment:Date;
  comm:any;
  constructor(private publication: PublicationService,public fauth: AngularFireAuth,private afDatabase: AngularFireDatabase,private userService: UsersService,private storage : AngularFireStorage,private group: ClasseService,private router: ActivatedRoute) { }

  ngOnInit(): void { this.comment=false;
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
   this.cours.subscribe(data =>{
     this.comm=data;
     console.log("comm",this.comm)
   })
   console.log("id",this.id)
   console.log("cours",this.cours)
}
})

}
/*objectValues(obj) {
  return Object.values(obj);
}
yescomment(){
  this.comment=!this.comment;
}
Navigate(url:any){
  console.log("lien",url)
    window.open(url, "_blank");
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
  supp(id_pub){
    console.log(this.id)
    this.publication.deletepub(this.id,id_pub)
  }
sendcomment(event,id_pub){
  console.log("event",event)
  this.date_comment=new Date();
  this.publication.comment(event.target.value,id_pub,this.id,this.date_comment.toString()) 
  this.yescomment()
}*/
}
