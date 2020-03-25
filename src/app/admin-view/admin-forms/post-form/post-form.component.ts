import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../../shared/models/post';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

const SERVER_URL = `${environment.backendUrl}/api/posts/`;

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy {
  postForm: FormGroup;
  post: Post;
  subs: Subscription[] = [];
  formTitle = 'Registration';

  constructor(
    private formBuilder: FormBuilder,
    private httpCliente: HttpClient,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.post = this.activatedRoute.snapshot.data.post;
    this.postForm = this.formBuilder.group({
      author: ['', Validators.required],
      title: ['', Validators.required],
      date: ['', Validators.required],
      imagePath: [''],
      content: ['', Validators.required]
    });

    if (this.post != null) {
      this.formTitle = 'Edition';
      this.fillForm();
    }
  }

  fillForm() {
    this.postForm.get('author').setValue(this.post.author);
    this.postForm.get('title').setValue(this.post.title);
    this.postForm.get('date').setValue(this.post.date);
    this.postForm.get('imagePath').setValue(this.post.imagePath);
    this.postForm.get('content').setValue(this.post.content);
  }

  imgListener(body) {
    this.postForm.get('imagePath').setValue(body.filename);
    this.postForm.get('imagePath').updateValueAndValidity();
  }

  getImgSrc() {
    return this.postForm.get('imagePath').value;
  }

  onSubmit() {
    if (this.formTitle === 'Registration') {
      this.subs.push(this.httpCliente.post(SERVER_URL, this.postForm.value)
        .subscribe(res => {
          this.snackBar.open('Successfully Submitted', 'x', { duration: 2000 });
          window.location.reload();
        }, err => {
          console.log(err),
            this.snackBar.open('Something went wrong, reload and try again', 'x', { duration: 2000 });
        }));
    } else {
      this.subs.push(this.httpCliente.patch(SERVER_URL + this.post._id, this.postForm.value)
        .subscribe(res => {
          this.snackBar.open('Successfully Updated', 'x', { duration: 2000 });
          window.location.reload();
        }, err => {
          console.log(err),
            this.snackBar.open('Something went wrong, reload and try again', 'x', { duration: 2000 });
        }));
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
