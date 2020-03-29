import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/sheared/service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/sheared/service/toast.service';
import { Evenement } from 'src/app/sheared/service/evenement';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  titre: string;
  contenu: string;
  img: File;
  password: string;
  num_Tel: number;
  code: string = "";
  selected: any;
  constructor(private upload:Evenement, public event:Evenement,private toaste : ToastService) { }
  ngOnInit(): void {
  }
  detect(event){
    this.selected=event.target.files[0];
    console.log(event); 
  }
  evenement(titre,contenu,img) {
    this.event.event(titre,contenu,this.selected)
    //this.event.upload(this.selected)
    this.toaste.showSuccess("Ajout avec success " , "success")
    setTimeout(() => {
      //this.service.logout();
   }, 2000);
}
photo() {
  this.event.upload(this.selected)
  this.toaste.showSuccess("Ajout avec success " , "success")}
}