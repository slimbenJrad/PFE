import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'src/app/sheared/service/publication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastService } from 'src/app/sheared/service/toast.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  log:any;
  profile:any;
  id:any;
  today:any;
  array=[];
  constructor(private pub: PublicationService,public fauth: AngularFireAuth,private toaste : ToastService) { }

  ngOnInit(): void {
    this.today=formatDate(new Date(), 'yyyy/MM/dd', 'en');
    this.profile = JSON.parse(localStorage.getItem('profil'));
    this.profile = this.fauth.authState.subscribe(data => {
      this.id = data.uid
      console.log("idss",this.id)
      this.log=this.pub.getreunion(this.id).subscribe(data=>{
        this.log = data
        console.log("reun",this.log)
        this.array=this.log;
        console.log("num",this.array.length)
      })
    })
    
  }
accept(reun){
  this.pub.Accepter(reun)
  this.toaste.showSuccess("Demande Acceptée " , "success")
}
refuse(reun){
  this.pub.Refuser(reun)
  this.toaste.showError("Demande Refusée " , "Refue")
}
}
