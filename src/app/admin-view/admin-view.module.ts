import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminCoreModule } from './admin-core/admin-core.module';
import { AdminViewRoutingModule } from './admin-view-routing.module';
import { AdminViewComponent } from './admin-view.component';
import { SignInModule } from './signin/signin.module';
import { AdminFormsModule } from './admin-forms/admin-forms.module';
import { DataListComponent } from './data-list/data-list.component';
import { MatSortModule, MatTableModule, MatInputModule, MatPaginatorModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    AdminViewComponent,
    DataListComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminCoreModule,
    AdminViewRoutingModule,
    SignInModule,
    AdminFormsModule,
    SharedModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [AdminViewComponent, HomeComponent]
})
export class AdminViewModule { }
