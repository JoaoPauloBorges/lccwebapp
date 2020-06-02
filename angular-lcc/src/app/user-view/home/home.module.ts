import { CarouselModule } from './carousel/carousel.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TopicPreviewModule } from '../topic-preview/topic-preview.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CarouselModule,
    TopicPreviewModule,
  ],
  exports: [
    HomeComponent,
    CarouselModule,
    TopicPreviewModule
  ]
})
export class HomeModule { }
