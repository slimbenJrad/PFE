import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from 'src/app/sheared/service/evenement';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  liste : Observable<any>
  constructor( private service: Evenement,private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
  this.liste=this.service.getevent();
   this.liste.subscribe(data => {
        console.log("data", data);
      })
  }
    )}
}
