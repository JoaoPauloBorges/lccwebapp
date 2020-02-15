import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Carrousel } from '../../../shared/models/carrousel';
import { environment } from '../../../../environments/environment';

const URL_RENDER = environment.backendrUrl + 'files/image/';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit, OnDestroy {

  user$: Observable<User>;
  user: User;
  sub: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 650px)'])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  logoPath: Observable<string>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private http: HttpClient,
    private router: Router) {
    this.user$ = userService.getUser();
    this.sub = this.user$.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.logoPath = this.http.get<Carrousel>(environment.backendrUrl + 'carrousel/logo', { observe: 'body' })
      .pipe(
        map(resp => URL_RENDER + resp.imagePath)
      );
  }

  logout() {
    console.log('logout');
    this.userService.logout();
    this.router.navigateByUrl('/home');
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
