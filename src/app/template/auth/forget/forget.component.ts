import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/sheared/service/auth.service';
import { error } from '@angular/compiler/src/util';
import { ToastService } from 'src/app/sheared/service/toast.service';


@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
email : string ;
regexp : any ;
valid:boolean;
  constructor(private service : AuthService,private toaste : ToastService) { }

  ngOnInit(): void {
  }
  forget(email){
    this.regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    this.valid=this.regexp.test(email)
    if(this.valid){
      this.toaste.showSuccess("Réinitialisation avec success " , "success")
    }
    else if(!this.valid){
      this.toaste.showError("echec de Réinitialisation " , "echec")
    }
    this.service.forgot(email)
    console.log("resultat",this.service.forgot(email))
  }

}
