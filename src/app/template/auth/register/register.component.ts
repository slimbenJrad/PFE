import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/sheared/service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/sheared/service/toast.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  parent: boolean = true;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  num_Tel: number;
  code: string = "";
  type_user: string;
  constructor(private service: AuthService, public fauth: AngularFireAuth, private router: Router,private toaste : ToastService) { }

  ngOnInit(): void {
  }
  register(firstName, lastName, num_Tel, type_user, code, email, password) {
    this.service.register(firstName, lastName, num_Tel, type_user, code, email, password)
    this.toaste.showSuccess("Ajout avec success " , "success")
    setTimeout(() => {
      this.router.navigate(['login']);
      //this.service.logout();
   }, 2000);
    


  }
  onChange(value) {
    console.log(value);
    if (value === "parent" || value === "") {
      this.parent = true;
      this.code = ""
    }
    else {
      this.parent = false;

    }
  }
}
