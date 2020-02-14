import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UploaderService } from './uploader.service';
import { Subscription } from 'rxjs';

export interface FileUpload {
  id: string;
  filename: string;
}

const IMG_RENDER =  environment.backendrUrl + 'files/image/';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit, OnDestroy {

  @ViewChild('imgFile') imgFile: ElementRef;
  @Output() bodyResponse = new EventEmitter();
  @Input() imagePath: string | ArrayBuffer;
  @Input() title = 'upload your image';

  progress = 0;
  uploadForm: FormGroup;
  uploadedFile: File;
  subs: Subscription[] = [];
  submited = false;
  progressBar = false;
  idImg = '';

  constructor(
    private formBuilder: FormBuilder,
    private service: UploaderService) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      fileInput: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.uploadedFile = event.target.files[0] as File;
      this.renderImgPreview();
    }
  }

  onSubmit() {
    this.progressBar = true;
    const formData = new FormData();
    formData.append('file', this.uploadedFile, this.uploadedFile.name);
    this.subs.push(this.service.submitImage(formData)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.min(Math.round((event.loaded / event.total * 100) - 20), 80);
        }
        if (event.type === HttpEventType.Response) {
          this.progress = 100;
          this.submited = true;
          this.imagePath = !!(event.body as FileUpload).filename ? (event.body as FileUpload).filename : '';
          this.bodyResponse.emit(event.body);
        }
      }, err => {
        console.log(err);
        this.cleanUp();
      }));
  }

  deleteImg() {
    if (this.isString()) {
      this.subs.push(this.service.deleteImage(this.imagePath as string)
      .subscribe(() => {
        this.bodyResponse.emit({filename: ''});
      }, err => console.log(err)));
    }

    this.cleanUp();
  }

  cleanUp() {
    this.imagePath = '';
    this.uploadForm.get('fileInput').setValue(null);
    this.submited = false;
    this.progressBar = false;
    this.progress = 0;
    this.uploadedFile = null;
    this.uploadForm.get('fileInput').updateValueAndValidity();
  }

  isString() {
    return (!!this.imagePath && (this.imagePath as string).length < 150);
  }

  getImgSrc() {
    return this.isString() ? IMG_RENDER + this.imagePath : this.imagePath;
  }

  private renderImgPreview() {
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedFile);
    reader.onloadend = (e) => {
      this.imagePath = reader.result;
    };
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}

