import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationService } from 'src/app/sheared/service/publication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { EleveService } from 'src/app/sheared/service/eleve.service';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/sheared/service/users.service';

@Component({
  selector: 'app-el-detail',
  templateUrl: './el-detail.component.html',
  styleUrls: ['./el-detail.component.css']
})
export class ElDetailComponent implements OnInit {
  idpub:any;
  detail:any;
  date_comment = new Date();
  allcoms:any;
  allcomsid:any;
  profile:any;
  id:any;
  user: any;
  comment:boolean;
  text:any;
  state:any;
  constructor(private userService: UsersService,private publication: PublicationService,private router: ActivatedRoute,private service: EleveService,public fauth: AngularFireAuth) { }

  ngOnInit(): void {    this.comment=false;
    this.router.paramMap.subscribe(params => {
      this.idpub = params.get('idpub');
      console.log("det",this.idpub)
      this.service.getdetail(this.idpub).subscribe(data => {
        this.detail=data;
        console.log("det",this.detail) })
      })
      this.allcoms=this.publication.getcomment(this.idpub)
      this.allcoms.subscribe(data=>{
        this.allcoms = data
        console.log("all cmntr ",this.allcoms)
      })
      this.profile = JSON.parse( localStorage.getItem('profil'));
  console.log("key",this.profile.firstName)
  this.state= this.fauth.authState.subscribe(data => {
    if (data) {
     this.id=data.uid
     console.log("id",this.id) }
  });
    }
    sendcomment(event){
      this.date_comment = new Date();
      console.log("date comment",this.date_comment)
      this.publication.comment(event.target.value,this.idpub,this.id,this.date_comment.toString(),this.profile.firstName,this.profile.lastName) 
      this.text="" 
    }
      yescomment(){
        this.comment=!this.comment;               
      }
    }
