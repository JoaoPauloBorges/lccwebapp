import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Carrousel } from '../../../shared/models/carrousel';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';


const API = environment.backendrUrl + 'carrousel/';

@Injectable({ providedIn: 'root' })

export class CarrouselService implements OnDestroy {

  subs: Subscription[] = [];

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  listCarrouselByPage(page: string): Observable<Carrousel> {
    return this.http.get<Carrousel>(API + page);
  }

  reduceImagePaths(formData: object): string[] {
    return Object.keys(formData).filter(field => field.includes('imagePath'))
      .map(field => {
        return formData[field];
      });
  }

  createCarrousel(formData) {

    const imagePath: string[] = this.reduceImagePaths(formData);

    this.subs.push(this.http.post(API, {
      imagePath,
      page: formData.page,
      invertColor: formData.invertColor
    })
      .subscribe(res => {
        this.snackBar.open('Successfully submitted', 'x', {
          duration: 2000,
        });
        window.location.reload();
      }, err => {
        console.log(err),
          this.snackBar.open('Something went wrong, reload and try again', 'x', {
            duration: 2000,
          });
      })
    );
  }

  editCarrousel(id: string, formData) {

    const imagePath: string[] = this.reduceImagePaths(formData);

    this.subs.push(this.http.patch(API + id, {
      _id: id,
      imagePath,
      page: formData.page,
      invertColor: formData.invertColor
    })
      .subscribe(() => {
        this.snackBar.open('Successfully Updated', 'x', {
          duration: 2000,
        });
        window.location.reload();
      }, err => {
        console.log(err),
          this.snackBar.open('Something went wrong, reload and try again', 'x', {
            duration: 2000,
          });
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}

