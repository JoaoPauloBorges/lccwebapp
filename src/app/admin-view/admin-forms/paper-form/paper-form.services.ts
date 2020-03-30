import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


const API = 'api/papers/';

@Injectable({ providedIn: 'root' })

export class PaperFormService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  paperSubmit(formData) {
    return this.http.post(API, formData);
  }

  paperEdition(id: string, formData: any) {
    return this.http.patch(API + id, formData);
  }

  paperDeletion(id: string) {
    return this.http.delete(API + id);
  }

}

