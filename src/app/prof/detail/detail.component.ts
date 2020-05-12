import { Component, OnInit, Input } from '@angular/core';
import { AfficheComponent } from '../affiche/affiche.component';
import { PublicationService } from 'src/app/sheared/service/publication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input() pub: string;
  id:any;
  cours:any;
  profile:any;
  allcoms:Observable<any>;
  comment:boolean;
  date_comment:Date;
  titre:string;
  titre_vis:boolean;
  classe_vis:boolean;
  contenu_vis:boolean;
  date_vis:boolean;
  type_vis:boolean;
  contenu:any;
  classe:any;
  date_cours:any;
  type:any;
  constructor(private router: ActivatedRoute,private publication: PublicationService,public fauth: AngularFireAuth) { }

  ngOnInit(): void { 
    this.router.paramMap.subscribe(params => {
    this.pub = params.get('pub');
    this.profile= this.fauth.authState.subscribe(data => {
       this.id=data.uid
       this.cours=this.publication.getpublication(this.id).subscribe(data => {
         this.cours=data;
       console.log("cours/data",this.cours) })})
    })
      

  }
  getCmnt(id_pub){    this.titre_vis=false;
    this.classe_vis=false;
    this.contenu_vis=false;
    this.date_vis=false;
    this.type_vis=false;
    this.comment=false;
    this.allcoms=this.publication.getcomment(id_pub)
    this.allcoms.subscribe(data=>{
      this.allcoms = data
      console.log("all cmntr",data)
    })
  }
  yescomment(){
  this.comment=!this.comment;}
 yestitre(){
  this.titre_vis=!this.titre_vis;}
  yesclasse(){
  this.classe_vis=!this.classe_vis;}
  yescontenu(){
   this.contenu_vis=!this.contenu_vis;}
  yesdate(){
   this.date_vis=!this.date_vis;}
  yestype(){
   this.type_vis=!this.type_vis;}
  sendcomment(event,id_pub){
    console.log("event",event)
    this.date_comment=new Date();
    this.publication.comment(event.target.value,id_pub,this.id,this.date_comment.toString()) 
    }
    nouveautitre(event){
      this.publication.changetitre(this.pub,event.target.value)
      this.yestitre()
    }
    nouveaucontenu(event){
      this.publication.changecontenu(this.pub,event.target.value)
      this.yescontenu()
    }
    nouveautype(event){
      this.publication.changetype(this.pub,event.target.value)
      this.yescontenu()
    }
    nouveauclasse(event){
      this.publication.changeclasse(this.pub,event.target.value)
      this.yescontenu()
    }
}
