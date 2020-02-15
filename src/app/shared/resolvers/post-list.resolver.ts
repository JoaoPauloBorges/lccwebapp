import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class PostListResolver implements Resolve<Post[]> {

  SERVER_URL = environment.backendrUrl + 'posts';

  constructor(private httpClient: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Post[] | Observable<Post[]> | Promise<Post[]> {
    return this.httpClient.get<Post[]>(this.SERVER_URL)
      .pipe(
        map(resp => (
          resp.filter(obj => obj.date = new Date(obj.date))
        )));
  }
}
