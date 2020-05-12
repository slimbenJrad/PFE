import { Component, OnInit } from '@angular/core';
import { ToastService } from '../sheared/service/toast.service';
import { MatiereService } from '../sheared/service/matiere.service';
import { PublicationService } from '../sheared/service/publication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { EleveService } from '../sheared/service/eleve.service'

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.css']
})
export class EleveComponent implements OnInit {

  constructor(private service:EleveService,private storage : AngularFireStorage,public fauth: AngularFireAuth,private publication: PublicationService,private toaste : ToastService,private mat:MatiereService) { }

  ngOnInit(): void {      
}
}
