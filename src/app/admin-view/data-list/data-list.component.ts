import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-researcher-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {
  columnsResearcher: string[] = ['name', 'headline', 'abbreviation', 'lattesUrl'];
  columnsPaper: string[] = ['title', 'paperDate', 'references'];
  columnsTopic: string[] = ['name', 'description'];
  columnsPost: string[] = ['author', 'title' , 'date'];

  displayedColumns: string[];
  dataSource = new MatTableDataSource();
  routeEdit: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataSource.data = this.route.snapshot.data.dataSource;
    const url = this.route.snapshot.url.toString();
    if (this.dataSource.data.length > 0) {

      switch (url) {
        case 'paper-list':
          this.displayedColumns = this.columnsPaper;
          this.routeEdit = 'paper';
          break;
        case 'researcher-list':
          this.displayedColumns = this.columnsResearcher;
          this.routeEdit = 'researcher';
          break;
        case 'topic-list':
          this.displayedColumns = this.columnsTopic;
          this.routeEdit = 'topic';
          break;
        case 'post-list':
          this.displayedColumns = this.columnsPost;
          this.routeEdit = 'post';
          break;
      }
    }
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRecord(row) {
    console.log(row);
  }

}
