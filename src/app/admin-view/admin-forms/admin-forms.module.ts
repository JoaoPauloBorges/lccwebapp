import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearcherFormComponent } from './researcher-form/researcher-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaperFormComponent } from './paper-form/paper-form.component';
import { SharedModule } from '../../shared/shared.module';
import { TopicFormComponent } from './topic-form/topic-form.component';
import { CarrouselFormComponent } from './carrousel-form/carrousel-form.component';
import { PostFormComponent } from './post-form/post-form.component';


@NgModule({
  declarations: [
    ResearcherFormComponent,
    PaperFormComponent,
    TopicFormComponent,
    CarrouselFormComponent,
    PostFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    ResearcherFormComponent,
    CarrouselFormComponent
  ]
})
export class AdminFormsModule { }
