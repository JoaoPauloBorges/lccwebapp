import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../admin-core/user/user.service';

@Injectable({ providedIn: 'root' })
export class SignInGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    if (this.userService.isLogged()) {
      this.router.navigateByUrl('/admin');
      return false;
    }
    return true;
  }

}
