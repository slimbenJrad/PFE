import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/sheared/service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/sheared/service/toast.service';
import { Evenement } from 'src/app/sheared/service/evenement';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { ClasseService } from 'src/app/sheared/service/classe.service';
import { Observable } from 'rxjs';
import { PublicationService } from 'src/app/sheared/service/publication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  titre: string;
  contenu: string;
  img: File;
  date_event:any;
  date :Date;
  selectedFiles:FileList;
  mindate: Date;
  date_ev: Date;//declaritha bech esta3matha fi uplaod w hawaltha lil string 5ater firebase mata9rach date
  imgsrc;
  imgpush;
  affiche:boolean;
  constructor(private afDatabase: AngularFireDatabase,public event:Evenement,private toaste : ToastService,private storage : AngularFireStorage) {
    this.mindate = new Date();
   }
  ngOnInit(): void {
  }

  chooseFiles(event){
    console.log(event);
    this.selectedFiles = event.target.files;
  }
  
  async uploadpic(){
    let file = this.selectedFiles.item(0);
    let uniquekey = 'event' +Math.floor(Math.random() *10000000);
    const filRef= this.storage.ref(`event/img/${uniquekey}`);
    const uploadTask = this.storage.upload(`event/img/${uniquekey}`,file);
   //this.imgsrc = uploadTask.get;
   /* uploadTask.snapshotChanges().pipe(
      finalize(() => {
      
        this.imgpush= filRef.getDownloadURL();
      })
    )
    .subscribe(data =>{
      console.log(data);
    });*/
    uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
    
      //Fetch the download URL of the Storage file
      uploadSnapshot.ref.getDownloadURL().then(downloadURL=> {
        this.imgpush = downloadURL ;
        console.log("URL",downloadURL)
      })
    })
  }
  
  upload(title,contenu,date_ev){
       this.date = new Date();
       console.log(this.date.toString())
       this.uploadpic();
       if(this.imgpush){
    this.afDatabase.list(`event`).push({
      img:this.imgpush,
      title:title,
      contenu:contenu,
      date_creation:this.date.toString(),
      date_event:date_ev.toString()
    })
    this.toaste.showSuccess("Ajout avec success " , "success")
  }
  else{
    this.toaste.showInfo("Alert","evenement en cours de telechargement")
  }
  }
  afficher(){
    this.affiche=!this.affiche;
  } 
  



  }
 /* evenement(titre,contenu,img) {
    this.event.upload(titre,contenu,this.selected)
    this.toaste.showSuccess("Ajout avec success " , "success")
   console.log(titre)
}
photo() {
  //this.event.upload(this.selected)
  this.toaste.showSuccess("Ajout avec success " , "success")}*/
