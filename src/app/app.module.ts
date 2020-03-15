import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './sheared/template/nav/nav.component';
import { FooterComponent } from './sheared/template/footer/footer.component';
import { HomeComponent } from './template/home/home.component';
import { NotFoundComponent } from './sheared/template/not-found/not-found.component';
import { SlideComponent } from './sheared/template/slide/slide.component';
import { LoginComponent } from './template/auth/login/login.component';
import { RegisterComponent } from './template/auth/register/register.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { VerifyComponent } from './verify/verify.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ForgetComponent } from './template/auth/forget/forget.component';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material-module';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SidenavbarComponent } from './admin/template/sidenavbar/sidenavbar.component';
import { UsersComponent } from './admin/users/users.component';

var config = {
  apiKey: "AIzaSyAZu5KzjBDro5N6D4czheCDGwOmcA9en7A",
  authDomain: "pfe-e-34597.firebaseapp.com",
  databaseURL: "https://pfe-e-34597.firebaseio.com",
  projectId: "pfe-e-34597",
  storageBucket: "pfe-e-34597.appspot.com",
  messagingSenderId: "639480253691",
  appId: "1:639480253691:web:e64553c69fedecb461345e",
  measurementId: "G-D8HKNFCQRW"
};

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    SlideComponent,
    LoginComponent,
    RegisterComponent,
    VerifyComponent,
    ForgotComponent,
    ForgetComponent,
    DashboardComponent,
    SidenavbarComponent,
    UsersComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    FormsModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }