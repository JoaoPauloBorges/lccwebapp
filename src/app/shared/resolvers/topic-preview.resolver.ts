import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { map } from 'rxjs/operators';
import { TopicPreview } from '../models/topic-preview';

@Injectable({ providedIn: 'root' })
export class TopicPreviewResolver implements Resolve<TopicPreview> {

  SERVER_URL = `${environment.backendUrl}/api/topics/`;

  constructor(private httpClient: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TopicPreview> {
    const id: string = route.params.topicId;
    return this.httpClient.get<TopicPreview>(this.SERVER_URL + id)
    .pipe(map(obj => ({...obj, date: new Date(obj.date)})));
  }
}
