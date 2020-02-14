import { AdminViewComponent } from './admin-view.component';
import { SigninComponent } from './signin/signin.component';
import { ResearcherFormComponent } from './admin-forms/researcher-form/researcher-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './admin-core/auth/auth.guard';
import { SignInGuard } from './signin/guard/signin.guard';
import { PaperFormComponent } from './admin-forms/paper-form/paper-form.component';
import { TopicFormComponent } from './admin-forms/topic-form/topic-form.component';
import { TopicListResolver } from '../shared/resolvers/topic-list.resolver';
import { ResearcherListResolver } from '../shared/resolvers/researcher-list.resolver';
import { ResearcherResolver } from '../shared/resolvers/researcher.resolver';
import { DataListComponent } from './data-list/data-list.component';
import { PaperResolver } from '../shared/resolvers/paper.resolver';
import { TopicPreviewResolver } from '../shared/resolvers/topic-preview.resolver';
import { PaperListResolver } from '../shared/resolvers/paper-list.resolver';
import { HomeComponent } from './home/home.component';
import { CarrouselFormComponent } from './admin-forms/carrousel-form/carrousel-form.component';
import { CarrouselListResolver } from '../shared/resolvers/carrousel-list.resolver';
import { PostFormComponent } from './admin-forms/post-form/post-form.component';
import { PostFormResolver } from '../shared/resolvers/post-form.resolve';
import { PostListResolver } from '../shared/resolvers/post-list.resolver';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminViewComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: 'carrousel/:page',
            component: CarrouselFormComponent,
            resolve: {
              carrousel: CarrouselListResolver,
            }
          },
        ]
      },
      {
        path: 'researcher-list',
        component: DataListComponent,
        resolve: {
          dataSource: ResearcherListResolver,
        }
      },
      {
        path: 'paper-list',
        component: DataListComponent,
        resolve: {
          dataSource: PaperListResolver,
        }
      },
      {
        path: 'topic-list',
        component: DataListComponent,
        resolve: {
          dataSource: TopicListResolver,
        }
      },
      {
        path: 'post-list',
        component: DataListComponent,
        resolve: {
          dataSource: PostListResolver,
        }
      },
      {
        path: 'researcher',
        component: ResearcherFormComponent
      },
      {
        path: 'paper',
        component: PaperFormComponent,
        resolve: {
          topics: TopicListResolver,
          researchers: ResearcherListResolver,
        }
      },
      {
        path: 'topic',
        component: TopicFormComponent
      },
      {
        path: 'post',
        component: PostFormComponent
      },
      {
        path: 'researcher/edit/:researcherId',
        component: ResearcherFormComponent,
        resolve: {
          researcher: ResearcherResolver,
        }
      },
      {
        path: 'paper/edit/:paperId',
        component: PaperFormComponent,
        resolve: {
          topics: TopicListResolver,
          researchers: ResearcherListResolver,
          paper: PaperResolver,
        }
      },
      {
        path: 'topic/edit/:topicId',
        component: TopicFormComponent,
        resolve: {
          topic: TopicPreviewResolver,
        }
      },
      {
        path: 'post/edit/:postId',
        component: PostFormComponent,
        resolve: {
          post: PostFormResolver,
        }
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: SigninComponent,
    canActivate: [SignInGuard]
  }
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminViewRoutingModule { }
