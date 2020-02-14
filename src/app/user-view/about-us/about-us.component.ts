import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Researcher } from 'src/app/shared/models/researcher';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  url = environment.backendrUrl + 'files/image/';

  researchers: Researcher[];

  constructor(private activatedRoute: ActivatedRoute) {
    this.researchers = this.activatedRoute.snapshot.data.researchers;
   }

  ngOnInit() {
  }

}
