import { Component, OnInit } from '@angular/core';
import { UsersService } from '../sheared/service/users.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ParentService } from '../sheared/service/parent.service';
import { AuthService } from '../sheared/service/auth.service';
import { PublicationService } from '../sheared/service/publication.service';
import { formatDate } from '@angular/common';
import { Evenement } from 'src/app/sheared/service/evenement';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar } from '@fullcalendar/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  reunion : any;
  calendarPlugins = [dayGridPlugin];
  id : any ;
  profile : any;
  state;
    user: any;
    calendarEvents = [];
    log : any ;
    time;
    array=[];
    ev_notif;
  constructor(public fauth: AngularFireAuth,private service:UsersService,private reun: PublicationService) { }
  ngOnInit(): void {
    this.ev_notif=this.service.getevent().subscribe(data=>{
      this.ev_notif = data ;
      console.log('ev',this.ev_notif)
      for(var i of this.ev_notif){
        this.calendarEvents.push({
          title : i.val.titre,
          date : i.val.date_ev = formatDate(i.val.date_ev, 'yyyy-MM-dd', 'en'),
          color: '#ff9f89'
        })
        console.log("event",this.calendarEvents);
      }
    })
    this.profile= JSON.parse(localStorage.getItem('profil'));
    console.log("key", this.profile)
    this.state = this.fauth.authState.subscribe(data => {
        this.id = data.uid
        this.reunion=this.service.getreunion(this.id).subscribe(data=>{
          this.reunion = data ;
          console.log('reunion notif ',this.reunion )
          if(this.profile.role=="prof"){
            for(var i of this.reunion){
              this.calendarEvents.push({
                title : "reunion",
                date : i.val.date= formatDate(i.val.date, 'yyyy-MM-dd', 'en'),
                color: '#ff9f89'
              })
              console.log("event+reun",this.calendarEvents);
            }
          }
        })
        this.log=this.reun.getaccepted(this.id).subscribe(data=>{
          this.log = data
          console.log("par reun",this.log)
          if(this.profile.role=="parent"){
            for(var i of this.log){
              this.calendarEvents.push({
                title : "reunion",
                date : i.val.date= formatDate(i.val.date, 'yyyy-MM-dd', 'en'),
                color: 'deepskyblue'
              })
              console.log("event+ par reun",this.calendarEvents);
            }
          }
        })
    })


  }
  click(){
     this.array.splice(0, 1);
    console.log("num2",this.array.length)
  }
  }

