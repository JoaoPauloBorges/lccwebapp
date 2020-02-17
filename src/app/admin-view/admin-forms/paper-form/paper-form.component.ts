import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Researcher } from '../../../shared/models/researcher';
import { TopicPreview } from '../../../shared/models/topic-preview';
import { ActivatedRoute } from '@angular/router';
import { Paper } from '../../../shared/models/paper';
import { PaperFormService } from './paper-form.services';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-paper-form',
  templateUrl: './paper-form.component.html',
  styleUrls: ['./paper-form.component.scss']
})
export class PaperFormComponent implements OnInit, OnDestroy {

  paperForm: FormGroup;
  paper: Paper;
  SERVER_URL = 'api/papers/';
  title = 'Registration';
  subs: Subscription[] = [];


  researcherList: Researcher[];
  topics: TopicPreview[];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private service: PaperFormService) { }

  ngOnInit() {
    this.topics = this.activatedRoute.snapshot.data.topics;
    this.researcherList = this.activatedRoute.snapshot.data.researchers;
    this.paper = this.activatedRoute.snapshot.data.paper;

    this.paperForm = this.formBuilder.group({
      title: ['', Validators.required],
      researchers: ['', Validators.required],
      paperDate: ['', Validators.required],
      topicId: ['', Validators.required],
      abstract: ['', Validators.required],
      references: ['', Validators.required],
      imagePath: ['', Validators.required]
    });

    if (this.paper != null) {
      this.title = 'Edition';
      this.fillForm();
    }
  }

  fillForm() {
    this.paperForm.get('title').setValue(this.paper.title);
    this.paperForm.get('researchers').setValue(this.paper.researchers.map(ob => ob._id));
    this.paperForm.get('paperDate').setValue(this.paper.paperDate);
    this.paperForm.get('topicId').setValue(this.paper.topicId);
    this.paperForm.get('abstract').setValue(this.paper.abstract);
    this.paperForm.get('references').setValue(this.paper.references);
    this.paperForm.get('imagePath').setValue(this.paper.imagePath);
  }

  getImgSrc() {
    return this.paperForm.get('imagePath').value;
  }

  getSelecionado() {
    let researcher: Researcher;
    if (this.researcherList) {
      researcher = this.researcherList
        .find(a =>
          a._id === this.paperForm.get('researchers').value[0]
        );
    }
    return researcher != null ? researcher.name : '';
  }

  paperImgListener(body) {
    this.paperForm.get('imagePath').setValue(body.filename);
    this.paperForm.get('imagePath').updateValueAndValidity();
  }

  onSubmit() {
    if (this.title === 'Registration') {
      this.subs.push(this.service.paperSubmit(this.paperForm.value)
          .subscribe(() => {
            this.snackBar.open('Successfully Updated', 'x', { duration: 2000, });
            window.location.reload();
          }, err => {
            console.log(err),
              this.snackBar.open('Something went wrong, reload and try again', 'x', { duration: 2000, });
          }));
    } else {
      this.subs.push(this.service.paperEdition(this.paper._id, this.paperForm.value)
        .subscribe(res => {
          this.snackBar.open('Successfully Updated', 'x', { duration: 2000, });
          window.location.reload();
        }, err => {
          console.log(err),
            this.snackBar.open('Something went wrong, reload and try again', 'x', { duration: 2000, });
        }));
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
