import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaperBySubjectListResolver } from './paper/paper-by-subject-list.resolver';
import { UserViewComponent } from './user-view.component';
import { NotFoundComponent } from '../shared/errors/not-found/not-found.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TopicListResolver } from '../shared/resolvers/topic-list.resolver';
import { PaperComponent } from './paper/paper.component';
import { ResearcherListResolver } from '../shared/resolvers/researcher-list.resolver';
import { ResearcherComponent } from './researcher/researcher.component';
import { ResearcherResolver } from '../shared/resolvers/researcher.resolver';
import { PostComponent } from './post/post.component';
import { PostListResolver } from '../shared/resolvers/post-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserViewComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        resolve: {
          topics: TopicListResolver
        }
      },
      {
        path: 'aboutUS',
        component: AboutUsComponent,
        resolve: {
          researchers: ResearcherListResolver
        }
      },
      {
        path: 'posts',
        component: PostComponent,
        resolve: {
          posts: PostListResolver
        }
      },
      {
        path: 'papers/:paperSubject',
        component: PaperComponent,
        resolve: {
          papers: PaperBySubjectListResolver
        }
      },
      {
        path: 'researchers/:researcherId',
        component: ResearcherComponent,
        resolve: {
          researcher: ResearcherResolver
        }
      },
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserViewRoutingModule { }
