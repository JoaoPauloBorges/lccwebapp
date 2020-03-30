import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TopicPreview } from '../../../shared/models/topic-preview';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../../shared/confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss']
})
export class TopicFormComponent implements OnInit, OnDestroy {

  topicForm: FormGroup;
  SERVER_URL = 'api/topics/';
  topicPreview: TopicPreview;
  subs: Subscription[] = [];
  title = 'Registration';

  constructor(
    private formBuilder: FormBuilder,
    private httpCliente: HttpClient,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.topicPreview = this.activatedRoute.snapshot.data.topic;
    this.topicForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imagePath: ['', Validators.required]
    });

    if (this.topicPreview != null) {
      this.title = 'Edition';
      this.fillForm();
    }
  }

  fillForm() {
    this.topicForm.get('name').setValue(this.topicPreview.name);
    this.topicForm.get('description').setValue(this.topicPreview.description);
    this.topicForm.get('imagePath').setValue(this.topicPreview.imagePath);
  }

  imgListener(body) {
    this.topicForm.get('imagePath').setValue(body.filename);
    this.topicForm.get('imagePath').updateValueAndValidity();
  }

  getImgSrc() {
    return this.topicForm.get('imagePath').value;
  }

  onSubmit() {
    if (this.title === 'Registration') {
      this.subs.push(this.httpCliente.post(this.SERVER_URL, this.topicForm.value)
        .subscribe(res => {
          console.log(res);
          this.snackBar.open('Successfully Submitted', 'x', {
            duration: 2000,
          });
          window.location.reload();
        }, err => {
          console.log(err),
            this.snackBar.open('Something went wrong, reload and try again', 'x', {
              duration: 2000,
            });
        }));
    } else {
      this.subs.push(this.httpCliente.patch(this.SERVER_URL + this.topicPreview._id, this.topicForm.value)
        .subscribe(res => {
          console.log(res);
          this.snackBar.open('Successfully Updated', 'x', {
            duration: 2000,
          });
          window.location.reload();
        }, err => {
          console.log(err),
            this.snackBar.open('Something went wrong, reload and try again', 'x', {
              duration: 2000,
            });
        }));
    }
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '300px',
      data: { title: 'Are you sure you want to delete this topic?', },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subs.push(this.httpCliente.delete(this.SERVER_URL + this.topicPreview._id)
          .subscribe(res => {
            this.snackBar.open('Successfully Deleted', 'x', {
              duration: 2000,
            });
            window.location.pathname = '/admin/topic-list';
          }, err => {
            console.log(err),
              this.snackBar.open('Something went wrong, reload and try again', 'x', {
                duration: 2000,
              });
          }));
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
