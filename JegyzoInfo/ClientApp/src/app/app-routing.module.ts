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
