import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavModule } from './admin-nav/admin-nav.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminNavModule
  ],
  exports: [AdminNavModule]
})
export class AdminCoreModule { }
