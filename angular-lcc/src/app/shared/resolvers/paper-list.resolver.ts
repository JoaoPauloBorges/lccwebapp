import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Paper } from '../models/paper';

@Injectable({ providedIn: 'root' })
export class PaperListResolver implements Resolve<Paper[]> {

  SERVER_URL = 'api/papers';

  constructor(private httpClient: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Paper[] | Observable<Paper[]> | Promise<Paper[]> {
    return this.httpClient.get<Paper[]>(this.SERVER_URL)
    .pipe(
      map(resp => (
        resp.filter(obj => obj.paperDate = new Date(obj.paperDate))
      )));
  }
}
