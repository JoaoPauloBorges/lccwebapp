import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';


const API = environment.backendrUrl + 'files/';

@Injectable({ providedIn: 'root' })

export class UploaderService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  submitImage(formData) {
    return this.http
      .post(API, formData, {
        reportProgress: true,
        observe: 'events',
      });
  }

  deleteImage(filename: string) {
    return this.http
    .delete(API + filename, {observe: 'body'});
  }
}

