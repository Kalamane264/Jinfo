import { ChapterPageComponent } from './pages/chapter-page/chapter-page.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
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
    path: "cikk/:id",
    component: ArticleComponent
  },
  {
    path: "cikkek",
    component: ArticlesComponent
  },
  {
    path: "jogszabaly/:uid",
    component: StatuteComponent
  },
  {
    path: "tudastar",
    component: KnowledgeBaseComponent
  },
  {
    path: "topic/:seourl",
    component: TopicPageComponent
  },
  {
    path: "chapter/:seourl",
    component: ChapterPageComponent
  },
  {
    path: "videos",
    component: VideosPageComponent
  },
  {
    path: "courses",
    component: CoursesPageComponent
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
