import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { TestComponent } from './test/test.component';
import { DashparentComponent } from './parent/dashparent/dashparent.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { EmploieComponent } from './admin/emploie/emploie.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './admin/emploie/dialog/dialog.component';
import { AbsenceComponent } from './admin/absence/absence.component';
import { HeureComponent } from './admin/absence/heure/heure.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CKEditorModule } from 'ckeditor4-angular';
import { MatRadioModule } from '@angular/material/radio';
import { ProfComponent } from './prof/prof.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ReunionComponent } from './parent/reunion/reunion.component';
import { SuggestionComponent } from './parent/suggestion/suggestion.component';
import { ParentComponent } from './parent/parent/parent.component';
import { EleveComponent } from './eleve/eleve.component';
import { DevoirComponent } from './eleve/devoir/devoir.component';
import { MatiereComponent } from './admin/matiere/matiere.component';
import { DialoComponent } from './admin/matiere/dialo/dialo.component';
import { PublicationComponent } from './prof/publication/publication.component';
import { AfficheComponent } from './prof/affiche/affiche.component';
import { DetailComponent } from './prof/detail/detail.component';
import { CoursComponent } from './eleve/cours/cours.component';
import { ElDetailComponent } from './eleve/el-detail/el-detail.component';
import { ChatComponent } from './chat/chat.component';
import { SoloComponent } from './eleve/solo/solo.component';
import { EnfantChatComponent } from './parent/enfant-chat/enfant-chat.component';
import { AffecterComponent } from './admin/affecter/affecter.component';
import { ProfchatComponent } from './prof/profchat/profchat.component';
import { ProfsoloComponent } from './eleve/profsolo/profsolo.component';
import { DemandeComponent } from './prof/demande/demande.component';
import { AcceptComponent } from './parent/accept/accept.component';
import { InboxComponent } from './admin/inbox/inbox.component';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { ProfileComponent } from './profile/profile.component';
import { FullCalendarModule } from '@fullcalendar/angular';

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
    ForgotComponent,
    ForgetComponent,
    DashboardComponent,
    SidenavbarComponent,
    UsersComponent,
    TestComponent,
    DashparentComponent,
    EmploieComponent,
    AbsenceComponent,
    HeureComponent,
    ProfComponent,
    ReunionComponent,
    SuggestionComponent,
    ParentComponent,
    EleveComponent,
    DevoirComponent,
    MatiereComponent,
    DialoComponent,
    PublicationComponent,
    AfficheComponent,
    DetailComponent,
    CoursComponent,
    ElDetailComponent,
    ChatComponent,
    SoloComponent,
    EnfantChatComponent,
    AffecterComponent,
    ProfchatComponent,
    ProfsoloComponent,
    DemandeComponent,
    AcceptComponent,
    InboxComponent,
    ProfileComponent,


  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    FormsModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule,
    AngularFireStorageModule,
    PdfViewerModule,
    MatDialogModule,
    Ng2SearchPipeModule,
    CKEditorModule,
    MatRadioModule,
    NgbModule,
    NgxMaterialTimepickerModule,
    TextareaAutosizeModule,
    FullCalendarModule
  ],
  entryComponents:[
    DialogComponent,
    HeureComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
