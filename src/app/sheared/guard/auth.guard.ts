import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  role: any;
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // on a recupere la variable expecteRole de app routing avec next.data et on l'a affecter dans la const expecteRole pour la comparer avec this.role
    const expecteRole = next.data.expecteRole;
    this.role = JSON.parse(localStorage.getItem('profil'));
    console.log(this.role.role);
    if (this.role.role !== expecteRole) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }

}
