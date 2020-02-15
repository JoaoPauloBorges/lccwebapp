import { Component, OnInit, Input } from '@angular/core';
import { Paper } from '../../shared/models/paper';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
