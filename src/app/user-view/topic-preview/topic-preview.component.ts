import { Component, OnInit } from '@angular/core';
import { TopicPreview } from '../../shared/models/topic-preview';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-topic-preview',
  templateUrl: './topic-preview.component.html',
  styleUrls: ['./topic-preview.component.scss']
})
export class TopicPreviewComponent implements OnInit {

  url = environment.backendrUrl + 'files/image/';

  topicPreviews: TopicPreview[];

  constructor(
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.topicPreviews = this.activatedRoute.snapshot.data.topics;
    // snapshot subscribe only once and get data
  }

  setStyle(index) {
    index++;
    return {
      'grid-column': index % 2 !== 0 ? '1/2' : '2/3',
      'grid-row-start': index
    };
  }
}
