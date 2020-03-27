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
  email: string;
  password: string;
  num_Tel: number;
  code: string = "";
  type_user: string;
  constructor(private service: AuthService, public event:Evenement, private router: Router,private toaste : ToastService) { }


  ngOnInit(): void {
  }
  evenement(titre,contenu) {
    this.event.event(titre,contenu)
    this.toaste.showSuccess("Ajout avec success " , "success")
    setTimeout(() => {
      //this.service.logout();
   }, 2000);
}
}