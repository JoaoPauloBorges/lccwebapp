import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Carrousel } from 'src/app/shared/models/carrousel';
import { CarrouselService } from './carrousel.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CarrouselControlService } from './carrousel-form-control-service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-carrousel-form',
  templateUrl: './carrousel-form.component.html',
  styleUrls: ['./carrousel-form.component.scss']
})
export class CarrouselFormComponent implements OnInit, OnDestroy {

  @Input() page: string;
  carrousel: Carrousel = {
    _id: '',
    page: this.page,
    imagePath: [''],
    invertColor: false
  };

  @Input() uniqueImg = false;
  @Input() msg: string;
  carrouselForm: FormGroup = new FormGroup({});
  formType = 'Registration';
  sub: Subscription;


  constructor(
    private service: CarrouselService,
    private formService: CarrouselControlService) {
  }

  ngOnInit() {
    this.sub = this.service.listCarrouselByPage(this.page)
      .subscribe(resp => {
        if (!!resp) {
          this.carrousel = resp;
          if (this.carrousel._id !== '') {
            this.formType = 'Edition';
          }
          this.updateFormControl();
        }
      });

    // inicializa o form control com o default
    this.updateFormControl();
  }

  updateFormControl() {
    this.carrouselForm = this.formService.toFormGroup(this.carrousel);
    this.carrouselForm.addControl('page', new FormControl(this.page, Validators.required));
    this.carrouselForm.addControl('invertColor', new FormControl(this.carrousel.invertColor));
  }

  addImg() {
    this.carrousel.imagePath.push('');
    this.updateFormControl();
    this.carrouselForm.updateValueAndValidity();
  }

  imgListener(body, i) {
    this.carrouselForm.get('imagePath' + i).setValue(body.filename);
    this.carrouselForm.get('imagePath' + i).updateValueAndValidity();
  }

  onSubmit() {
    if (this.formType === 'Registration') {
      this.service.createCarrousel(this.carrouselForm.value);
    } else {
      this.service.editCarrousel(this.carrousel._id, this.carrouselForm.value);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
