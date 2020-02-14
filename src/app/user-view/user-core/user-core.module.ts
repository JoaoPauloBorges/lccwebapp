import { FooterModule } from './footer/footer.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './header/header.module';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule
  ],
  exports: [
    HeaderModule,
    FooterModule
  ],
})
export class UserCoreModule { }
