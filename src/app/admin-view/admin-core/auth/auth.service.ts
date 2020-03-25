import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService) { }

  authenticate(email: string, password: string) {
    return this.http
      .post(`${environment.backendUrl}/api/auth`, { email, password }, { observe: 'response'})
      .pipe(tap(res => {
        // tslint:disable-next-line: no-string-literal
        const authToken = res.body['accessToken'];
        this.userService.setToken(authToken);
        console.log(authToken);
      })
      );
  }
}
