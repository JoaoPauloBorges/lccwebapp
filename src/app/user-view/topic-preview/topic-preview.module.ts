import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicPreviewComponent } from './topic-preview.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';



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
