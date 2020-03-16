import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './template/home/home.component';
import { NotFoundComponent } from './sheared/template/not-found/not-found.component';
import { LoginComponent } from './template/auth/login/login.component';
import { RegisterComponent } from './template/auth/register/register.component';
import { from } from 'rxjs';
import { ForgetComponent } from './template/auth/forget/forget.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SidenavbarComponent } from './admin/template/sidenavbar/sidenavbar.component';
import { UsersComponent } from './admin/users/users.component';
import { AuthGuard } from './sheared/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'admin', component: SidenavbarComponent, canActivate: [AuthGuard],
   //role doit etre ='admin'
    data: {
      expecteRole: 'admin'

    },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users/:name', component: UsersComponent }
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
