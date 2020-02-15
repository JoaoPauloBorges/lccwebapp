import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearcherComponent } from './researcher.component';
import { DemoMaterialModule } from '../../shared/material/material.module';



@NgModule({
  declarations: [ResearcherComponent],
  imports: [
    CommonModule,
    DemoMaterialModule
  ],
  exports: [ResearcherComponent]
})
export class ResearcherModule { }
