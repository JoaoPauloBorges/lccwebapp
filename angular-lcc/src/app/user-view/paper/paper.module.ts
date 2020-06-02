import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaperComponent } from './paper.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    PaperComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [ PaperComponent ]
})
export class PaperModule { }
