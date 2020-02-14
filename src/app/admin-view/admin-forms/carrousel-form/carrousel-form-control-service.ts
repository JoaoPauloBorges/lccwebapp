import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Carrousel } from 'src/app/shared/models/carrousel';

@Injectable({ providedIn: 'root' })
export class CarrouselControlService {
  constructor() { }

  toFormGroup(carrousel: Carrousel) {
    const group: any = {};

    carrousel.imagePath.forEach((path, index) => {
      group['imagePath' + index] = new FormControl(path, Validators.required);
    });
    return new FormGroup(group);
  }

}
