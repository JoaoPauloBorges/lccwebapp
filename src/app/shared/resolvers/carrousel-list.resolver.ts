import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Carrousel } from '../models/carrousel';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CarrouselListResolver implements Resolve<Carrousel[]> {

  SERVER_URL = environment.backendrUrl + 'carrousel/';

  constructor(private httpClient: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Carrousel[] | Observable<Carrousel[]> | Promise<Carrousel[]> {
    const page: string = route.params.page;
    return this.httpClient.get<Carrousel[]>(this.SERVER_URL + page);
  }
}
