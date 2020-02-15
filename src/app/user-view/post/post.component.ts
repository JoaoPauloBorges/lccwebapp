import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../shared/models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  posts: Post[];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.posts = this.activatedRoute.snapshot.data.posts;
  }

}
