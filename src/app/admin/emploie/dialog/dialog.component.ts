import { Component, OnInit,Inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/sheared/service/toast.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {
  selectedFiles:FileList;
  imgpush;
  date:Date;
  date_modif:any;
  name : string ;
  constructor(public dialog: MatDialog,private storage : AngularFireStorage,private afDatabase: AngularFireDatabase,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,private toaste : ToastService) { }

  ngOnInit(): void {
  }
  chooseFiles(event){
    console.log(event);
    this.selectedFiles = event.target.files;
    if(this.data.name==="prof"){
      this.name="prof"
    }
    else if(this.data.name==="eleve"){
      this.name="classe"
    }
    if(this.selectedFiles.item(0)){
      this.uploadpic(this.name);
    }
    
  }
  async uploadpic(name:any){
    let file = this.selectedFiles.item(0);
    let uniquekey = 'PDF' +Math.floor(Math.random() *10000000);
    const filRef= this.storage.ref(`emlpoie/${name}/${uniquekey}`);
    const uploadTask = this.storage.upload(`emploie/${name}/${uniquekey}`,file);
   //this.imgsrc = uploadTask.get;
    
    uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      //Fetch the download URL of the Storage file
      uploadSnapshot.ref.getDownloadURL().then(downloadURL=> {
        this.imgpush = downloadURL ;
        console.log("URL",downloadURL)
      })
    }
    )
    
  }
  uploadempl(){
    this.date = new Date();
    console.log(this.date)   
    if(this.imgpush){
    console.log(this.data.id);
      console.log("image push",this.imgpush)
      this.afDatabase.object(`emploie/${this.name}/${this.data.id}`).set({
      horaire:this.imgpush,
      date_modif:this.date.toString()
      })
      this.toaste.showSuccess("Ajout avec success " , "success")
    }
    else{
      this.toaste.showInfo("Alert","image en cours de telechargement")
    }
  }
  
}
