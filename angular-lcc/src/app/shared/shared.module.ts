import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsModule } from './errors/errors.module';
import { DateInFull } from './pipes/date-in-full.pipe';
import { UploaderComponent } from './uploader/uploader.component';
import { DemoMaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LimitChar } from './pipes/limit-char.pipe';


@NgModule({
  declarations: [
    DateInFull,
    LimitChar,
    UploaderComponent,
  ],
  imports: [
    CommonModule,
    ErrorsModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DateInFull,
    LimitChar,
    ErrorsModule,
    UploaderComponent,
    DemoMaterialModule
  ]
})
export class SharedModule { }
