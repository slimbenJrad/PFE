import { Component, OnInit } from '@angular/core';
import { AuthService } from '../sheared/service/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor(private service:AuthService) { }

  ngOnInit(): void {
  }
forgot(reset){
  this.forgot(reset);
}
}
