import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicPreviewComponent } from './topic-preview.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    TopicPreviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    SharedModule
  ],
  exports: [TopicPreviewComponent]
})
export class TopicPreviewModule { }
