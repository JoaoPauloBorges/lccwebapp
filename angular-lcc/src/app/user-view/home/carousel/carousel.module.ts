import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';


@NgModule({
  declarations: [CarouselComponent],
  imports: [
    CommonModule,
    MatCarouselModule.forRoot(),
  ],
  exports: [
    CarouselComponent
  ]
})
export class CarouselModule { }
