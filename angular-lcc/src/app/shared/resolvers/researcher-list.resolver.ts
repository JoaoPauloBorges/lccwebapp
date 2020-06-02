import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Researcher } from '../models/researcher';

@Injectable({ providedIn: 'root' })
export class ResearcherListResolver implements Resolve<Researcher[]> {

  SERVER_URL = 'api/researchers';

  constructor(private httpClient: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Researcher[]> {
    return this.httpClient.get<Researcher[]>(this.SERVER_URL);
  }
}
