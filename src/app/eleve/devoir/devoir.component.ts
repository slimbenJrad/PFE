import { Component, OnInit } from '@angular/core';
import { EleveService } from 'src/app/sheared/service/eleve.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { PublicationService } from 'src/app/sheared/service/publication.service';
import { ToastService } from 'src/app/sheared/service/toast.service';
import { MatiereService } from 'src/app/sheared/service/matiere.service';

@Component({
  selector: 'app-devoir',
  templateUrl: './devoir.component.html',
  styleUrls: ['./devoir.component.css']
})
export class DevoirComponent implements OnInit {
  selected:any;
  titre:string;
  matiere:any;
  file: File;
  selectedcours:FileList;
  Remarque:any;
  prof:any;
  selectedprof:any;
  profile:any;
  id_el:any;
  imgpush:any;
  date:Date;
  constructor(private service:EleveService,private storage : AngularFireStorage,public fauth: AngularFireAuth,private publication: PublicationService,private toaste : ToastService,private mat:MatiereService) { }


  ngOnInit(): void {      this.date= new Date();

    this.matiere=this.mat.getAllMatiere();
    this.prof=this.publication.getAllprof();
    this.selected=null;
    this.profile = JSON.parse( localStorage.getItem('profil'));
  console.log("key",this.profile)
  this.profile= this.fauth.authState.subscribe(data => {
    if (data) {
     this.id_el=data.uid
     console.log("id",this.id_el) }
  });
}
choose(travail){
  console.log("travail",travail);
  this.selectedcours = travail.target.files;
  if(this.selectedcours.item(0)){
    console.log("caught",this.selectedcours.item(0))
    this.uploadpic()
  }
}
async uploadpic(){
  let file = this.selectedcours.item(0);
  let uniquekey = 'event' +Math.floor(Math.random() *10000000);
  const filRef= this.storage.ref(`event/img/${uniquekey}`);
  const uploadTask = this.storage.upload(`event/img/${uniquekey}`,file);
 
  uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
  
    //Fetch the download URL of the Storage file
    uploadSnapshot.ref.getDownloadURL().then(downloadURL=> {
      this.imgpush = downloadURL ;
      console.log("URL",downloadURL)
    })
  })
}
envoyer(){
  this.service.pub(this.titre,this.selected,this.Remarque,this.imgpush,this.date.toString(),this.selectedprof,this.id_el)
}
}
