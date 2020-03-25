import { Injectable } from '@angular/core';
import { TopicPreview } from '../../shared/models/topic-preview';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const SERVER_URL = `${environment.backendUrl}/api/topics`;

@Injectable({ providedIn: 'root' })
export class TopicPreviewService {

  constructor(private httpClient: HttpClient) {}

  listTopicPreviews(): Observable<TopicPreview[]> {
    return this.httpClient.get<TopicPreview[]>(SERVER_URL);
  }
}
