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
import{EmploieComponent} from './admin/emploie/emploie.component';
// a7na 3ana zouz component b nafes el esm "DashboardComponent" donc mahouch bech ya3ref anhi bdhbet eli 
//bech yemchilha donc na3mlou alias "as DashboardParent " bech nfar9ou binet zouz el comonent andhom nafs el esm
const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'dashparent', component: DashparentComponent },

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
      { path: 'emploie/:name', component: EmploieComponent }

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
