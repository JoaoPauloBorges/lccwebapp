import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Researcher } from '../../shared/models/researcher';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-researcher',
  templateUrl: './researcher.component.html',
  styleUrls: ['./researcher.component.scss']
})
export class ResearcherComponent implements OnInit {

  url = 'api/files/image/';

  researcher: Researcher;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.researcher = this.activatedRoute.snapshot.data.researcher;
  }

}
