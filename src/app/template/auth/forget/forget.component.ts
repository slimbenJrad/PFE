import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/sheared/service/auth.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
email : string ;
  constructor(private service : AuthService) { }

  ngOnInit(): void {
  }
  forget(email){
    this.service.forgot(email);
  }

}
