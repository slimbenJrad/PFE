import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './template/home/home.component';
import { NotFoundComponent } from './sheared/template/not-found/not-found.component';
import { LoginComponent } from './template/auth/login/login.component';
import { RegisterComponent } from './template/auth/register/register.component';
import { ForgetComponent } from './template/auth/forget/forget.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SidenavbarComponent } from './admin/template/sidenavbar/sidenavbar.component';
import { UsersComponent } from './admin/users/users.component';
import { AuthGuard } from './sheared/guard/auth.guard';
import { TestComponent } from './test/test.component';
import { DashparentComponent } from './parent/dashparent/dashparent.component';
import {EmploieComponent} from './admin/emploie/emploie.component';
import {AbsenceComponent} from './admin/absence/absence.component';
import {ProfComponent} from'./prof/prof.component';
import {ReunionComponent} from'./parent/reunion/reunion.component';
import {SuggestionComponent} from'./parent/suggestion/suggestion.component';
import {ParentComponent } from './parent/parent/parent.component';
import {EleveComponent } from './eleve/eleve.component';
import {DevoirComponent } from './eleve/devoir/devoir.component';
import {MatiereComponent} from './admin/matiere/matiere.component';
import {PublicationComponent} from './prof/publication/publication.component'
import {AfficheComponent} from './prof/affiche/affiche.component'
import {DetailComponent} from './prof/detail/detail.component'
import {CoursComponent } from './eleve/cours/cours.component';
import {ElDetailComponent } from './eleve/el-detail/el-detail.component';

// a7na 3ana zouz component b nafes el esm "DashboardComponent" donc mahouch bech ya3ref anhi bdhbet eli 
//bech yemchilha donc na3mlou alias "as DashboardParent " bech nfar9ou binet zouz el comonent andhom nafs el esm
const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'parent', component: ParentComponent,canActivate: [AuthGuard],
  //role doit etre ='parent'
   data: {
     expecteRole: 'parent'
   },
  children: [
    { path: 'dashparent', component: DashparentComponent},
    { path: 'reunion', component: ReunionComponent },
    { path: 'suggestion', component: SuggestionComponent },
  ] },
  { path: 'eleve', component: EleveComponent,canActivate: [AuthGuard],
  //role doit etre ='parent'
   data: {
     expecteRole: 'eleve'
   },
  children: [
    { path: 'devoir', component: DevoirComponent}, 
    { path: 'cours', component: CoursComponent },
    { path: 'el_detail/:idpub', component: ElDetailComponent},

  ] },
  { path: 'prof', component: ProfComponent,canActivate: [AuthGuard],
  //role doit etre ='prof'
   data: {
     expecteRole: 'prof'
   },
   children: [
    { path: 'publication', component: PublicationComponent},
    { path: 'affiche', component: AfficheComponent},
    { path: 'detail/:pub', component: DetailComponent},
  ] 
   },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'admin', component: SidenavbarComponent, canActivate: [AuthGuard],
   //role doit etre ='admin'
    data: {
      expecteRole: 'admin'
    },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users/:name', component: UsersComponent },
      { path: 'emploie/:name', component: EmploieComponent },
      { path: 'absence/:id', component: AbsenceComponent },
      { path: 'matiere', component: MatiereComponent },

    ]
  },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget', component: ForgetComponent },
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
