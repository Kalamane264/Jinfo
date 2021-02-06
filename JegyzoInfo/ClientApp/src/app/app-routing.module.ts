import { VideosPageComponent } from './pages/videos-page/videos-page.component';
import { VideosComponent } from './components/videos/videos.component';
import { TopicPageComponent } from './pages/topic-page/topic-page.component';
import { KnowledgeBaseComponent } from './pages/knowledge-base/knowledge-base.component';
import { StatuteComponent } from './pages/statute/statute.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ArticleComponent } from './pages/article/article.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "cikk",
    component: ArticleComponent
  },
  {
    path: "cikkek",
    component: ArticlesComponent
  },
  {
    path: "jogszabaly",
    component: StatuteComponent
  },
  {
    path: "tudastar",
    component: KnowledgeBaseComponent
  },
  {
    path: "topic",
    component: TopicPageComponent
  },
  {
    path: "videos",
    component: VideosPageComponent
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
