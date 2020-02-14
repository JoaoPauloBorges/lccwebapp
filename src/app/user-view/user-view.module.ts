import { AboutUsModule } from './about-us/about-us.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home/home.module';
import { UserViewRoutingModule } from './user-view-routing.module';
import { UserViewComponent } from './user-view.component';
import { UserCoreModule } from './user-core/user-core.module';
import { SharedModule } from '../shared/shared.module';
import { PaperModule } from './paper/paper.module';
import { ResearcherModule } from './researcher/researcher.module';
import { PostModule } from './post/post.module';

@NgModule({
  declarations: [
    UserViewComponent,
  ],
  imports: [
    CommonModule,
    UserViewRoutingModule,
    UserCoreModule,
    HomeModule,
    AboutUsModule,
    SharedModule,
    PaperModule,
    ResearcherModule,
    PostModule
  ]
})
export class UserViewModule { }
