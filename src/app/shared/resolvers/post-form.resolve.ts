import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class PostFormResolver implements Resolve<Post> {

  SERVER_URL = environment.backendrUrl + 'posts/';

  constructor(private httpClient: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> {
    const id: string = route.params.postId;
    return this.httpClient.get<Post>(this.SERVER_URL + id)
    .pipe(map(obj => ({...obj, date: new Date(obj.date)})));
  }
}
