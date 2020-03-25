import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { map, tap } from 'rxjs/operators';
import { Paper } from '../models/paper';

@Injectable({ providedIn: 'root' })
export class PaperResolver implements Resolve<Paper> {

  SERVER_URL = `${environment.backendUrl}/api/papers/`;

  constructor(private httpClient: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Paper> {
    const paperId: string = route.params.paperId;
    return this.httpClient.get<Paper>(this.SERVER_URL + paperId)
    .pipe(map(obj => ({...obj, paperDate: new Date(obj.paperDate)})));
  }
}
