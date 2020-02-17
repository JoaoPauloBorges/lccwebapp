import { CarouselModule } from './../home/carousel/carousel.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FooterModule } from '../user-core/footer/footer.module';



@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    CarouselModule,
    MatCardModule,
    RouterModule,
    SharedModule,
    FooterModule
  ]
})
export class AboutUsModule { }
