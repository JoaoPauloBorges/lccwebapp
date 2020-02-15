import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { TopicPreview } from '../models/topic-preview';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TopicListResolver implements Resolve<TopicPreview[]> {

  SERVER_URL = environment.backendrUrl + 'topics';

  constructor(private httpClient: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    TopicPreview[] | Observable<TopicPreview[]> | Promise<TopicPreview[]> {
    return this.httpClient.get<TopicPreview[]>(this.SERVER_URL)
      .pipe(
        map(resp => (
          resp.filter(obj => obj.date = new Date(obj.date))
        )));
  }
}
