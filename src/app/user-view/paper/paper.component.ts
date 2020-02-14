import { Component, OnInit, Input } from '@angular/core';
import { Paper } from 'src/app/shared/models/paper';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss']
})
export class PaperComponent implements OnInit {
  url = environment.backendrUrl + 'files/image/';

  @Input() papers: Paper[];
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.papers = this.activatedRoute.snapshot.data.papers;
  }
}
